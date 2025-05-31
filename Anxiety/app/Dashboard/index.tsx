// React & React Native
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Expo & Navegação
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Animatable from "react-native-animatable";

// Firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

// Estilos
import { styles } from "../../styles/dashboardStyles";

// --- Constantes e tipos ---

const screenWidth = Dimensions.get("window").width;

type DayStatus = "locked" | "unlocked" | "completed";

interface Day {
  number: number;
  status: DayStatus;
  progressoRespiracao: number;
  progressoModoFoco: number;
}

interface ProgressoData {
  days: Day[];
  totalDays: number;
  respiracaoCount: number;
  modoFocoCount: number;
  lastAccessDate: string; // ISO string yyyy-mm-dd
}

// --- Funções auxiliares ---

// Salva o progresso na subcoleção do usuário no Firestore, usando merge para não sobrescrever dados existentes
async function salvarProgressoNoUsuario(
  userId: string,
  trilhaId: string,
  progressoData: ProgressoData
) {
  const progressoRef = doc(db, "users", userId, "progressoTrilhas", trilhaId);
  try {
    await setDoc(progressoRef, progressoData, { merge: true });
    console.log("Progresso da trilha salvo com sucesso");
  } catch (error) {
    console.error("Erro ao salvar progresso no usuário:", error);
  }
}

// --- Componente principal ---

export default function Dashboard() {
  const router = useRouter();
  const auth = getAuth();

  // Estados
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [totalDays, setTotalDays] = useState(0);
  const [respiracaoCount, setRespiracaoCount] = useState(0);
  const [modoFocoCount, setModoFocoCount] = useState(0);
  const [days, setDays] = useState<Day[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [configModalVisible, setConfigModalVisible] = useState(false);

  const [inputDays, setInputDays] = useState("");
  const [inputRespiracao, setInputRespiracao] = useState("");
  const [inputModoFoco, setInputModoFoco] = useState("");
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  // --- Efeito para monitorar autenticação e carregar dados ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/SignIn");
        return;
      }

      setUserId(user.uid);

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setProfileImageUrl(userData.profileImageUrl || null);
      }

      await carregarProgresso(user.uid);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // --- Função para carregar progresso da trilha ---
  async function carregarProgresso(uid: string) {
    try {
      const trilhaRef = doc(db, "users", uid, "progressoTrilhas", "trilhaPrincipal");
      const docSnap = await getDoc(trilhaRef);

      const hojeStr = new Date().toISOString().split("T")[0];

      if (docSnap.exists()) {
        const data = docSnap.data() as ProgressoData;
        const lastAccess = data.lastAccessDate || hojeStr;

        setTotalDays(data.totalDays ?? 0);
        setRespiracaoCount(data.respiracaoCount ?? 0);
        setModoFocoCount(data.modoFocoCount ?? 0);
        setDays(data.days ?? []);

        // Se último acesso foi diferente de hoje, desbloqueia próximo dia
        if (lastAccess !== hojeStr) {
          const updatedDays = [...(data.days ?? [])];
          const nextLockedIndex = updatedDays.findIndex((d) => d.status === "locked");

          if (nextLockedIndex !== -1) {
            updatedDays[nextLockedIndex].status = "unlocked";
            setDays(updatedDays);
            await setDoc(
              trilhaRef,
              { ...data, days: updatedDays, lastAccessDate: hojeStr },
              { merge: true }
            );
          } else {
            await setDoc(trilhaRef, { ...data, lastAccessDate: hojeStr }, { merge: true });
          }
        }
      } else {
        // Se não existir, cria dados iniciais
        const dadosIniciais: ProgressoData = {
          days: [],
          totalDays: 0,
          respiracaoCount: 0,
          modoFocoCount: 0,
          lastAccessDate: hojeStr,
        };

        setTotalDays(0);
        setRespiracaoCount(0);
        setModoFocoCount(0);
        setDays([]);

        await setDoc(trilhaRef, dadosIniciais);
      }
    } catch (error) {
      console.error("Erro ao carregar progresso:", error);
    }
  }

  // --- Função para salvar progresso no Firestore ---
  async function salvarProgressoNoFirebase(
    updatedDays: Day[],
    newRespCount?: number,
    newModoFocoCount?: number,
    newTotalDays?: number
  ) {
    if (!userId) return;

    const progressoData: ProgressoData = {
      days: updatedDays,
      totalDays: newTotalDays ?? totalDays,
      respiracaoCount: newRespCount ?? respiracaoCount,
      modoFocoCount: newModoFocoCount ?? modoFocoCount,
      lastAccessDate: new Date().toISOString().split("T")[0],
    };

    try {
      await salvarProgressoNoUsuario(userId, "trilhaPrincipal", progressoData);
    } catch (error) {
      console.error("Erro ao salvar progresso:", error);
    }
  }

  // --- Handlers e funções auxiliares ---

  function openProgressModal(dayIndex: number) {
    setSelectedDayIndex(dayIndex);
    setModalVisible(true);
  }

  function openConfigModal() {
    setInputDays("");
    setInputRespiracao("");
    setInputModoFoco("");
    setConfigModalVisible(true);
  }

  function confirmConfig() {
    const qDays = parseInt(inputDays, 10);
    const qResp = parseInt(inputRespiracao, 10);
    const qFoco = parseInt(inputModoFoco, 10);

    if (
      isNaN(qDays) ||
      qDays <= 0 ||
      qDays > 100 ||
      isNaN(qResp) ||
      qResp < 0 ||
      qResp > 20 ||
      isNaN(qFoco) ||
      qFoco < 0 ||
      qFoco > 20
    ) {
      Alert.alert("Erro", "Digite valores válidos:\nDias: 1-100\nRespiração e Modo Foco: 0-20");
      return;
    }

    setTotalDays(qDays);
    setRespiracaoCount(qResp);
    setModoFocoCount(qFoco);

    const newDays: Day[] = Array.from({ length: qDays }, (_, i) => ({
      number: qDays - i,
      status: i === 0 ? "unlocked" : "locked",
      progressoRespiracao: 0,
      progressoModoFoco: 0,
    }));

    setDays(newDays);
    salvarProgressoNoFirebase(newDays);
    setConfigModalVisible(false);
  }

  function handleDayPress(dayNumber: number) {
    if (days.length === 0) return;

    const index = days.findIndex((d) => d.number === dayNumber);
    if (index === -1) return;

    if (days[index].status === "unlocked") {
      const newDays = days.slice();
      newDays[index].status = "completed";

      if (index + 1 < days.length && newDays[index + 1].status === "locked") {
        newDays[index + 1].status = "unlocked";
      }

      setDays(newDays);
      salvarProgressoNoFirebase(newDays);
    }
  }

  // --- Renderização ---

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#7B339C" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra superior com perfil */}
      <Animatable.View animation="fadeInLeft" style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push("/Profile")}>
          {profileImageUrl ? (
            <Image source={{ uri: profileImageUrl }} style={{ width: 45, height: 45, borderRadius: 22.5 }} />
          ) : (
            <Ionicons name="person-circle" size={45} color="#7B339C" />
          )}
        </TouchableOpacity>
      </Animatable.View>

      {/* Lista de dias em scroll vertical */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          minHeight: days.length * 90 + 130,
          paddingBottom: 60,
        }}
        showsVerticalScrollIndicator
      >
        <View style={{ flex: 1, position: "relative", minHeight: days.length * 90 + 80 }}>
          {days.map((day, i) => {
            const x = screenWidth / 2 + 90 * Math.sin((i * Math.PI) / 6) - 30;
            const y = 80 * i + 35 + (i === 0 ? 15 : 0);
            const isClickable = day.status !== "locked";

            return (
              <Animatable.View
                animation="fadeInUp"
                delay={i * 50}
                key={day.number}
                style={{ position: "absolute", left: x, top: y, alignItems: "center" }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (isClickable) openProgressModal(i);
                  }}
                  disabled={!isClickable}
                  style={[
                    styles.dayCircle,
                    day.status === "completed" && styles.dayCompleted,
                    day.status === "locked" && styles.dayLocked,
                  ]}
                >
                  {day.status === "completed" ? (
                    <FontAwesome5 name="check" size={24} color="white" />
                  ) : (
                    <Text style={[styles.dayNumber, day.status === "locked" && styles.dayNumberLocked]}>
                      {day.number}
                    </Text>
                  )}

                  {day.status !== "locked" && (
                    <View style={styles.progressContainer}>
                      <View
                        style={[
                          styles.progressBarRespiracao,
                          {
                            width:
                              respiracaoCount === 0
                                ? 0
                                : (day.progressoRespiracao / respiracaoCount) * 60,
                          },
                        ]}
                      />
                      <View
                        style={[
                          styles.progressBarModoFoco,
                          {
                            width:
                              modoFocoCount === 0
                                ? 0
                                : (day.progressoModoFoco / modoFocoCount) * 60,
                          },
                        ]}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </Animatable.View>
            );
          })}
        </View>
      </ScrollView>

      {/* Botões de navegação */}
      <Animatable.View animation="fadeInUp" style={styles.botoes}>
        <TouchableOpacity onPress={openConfigModal}>
          <FontAwesome5 name="map" size={25} color="#7B339C" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Calendar")}>
          <FontAwesome5 name="calendar-alt" size={25} color="#7B339C" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Pomodor")}>
          <MaterialCommunityIcons name="school-outline" size={25} color="#7B339C" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Respiracao")}>
          <MaterialCommunityIcons name="clock-outline" size={25} color="#7B339C" />
        </TouchableOpacity>
      </Animatable.View>

      {/* Modal de progresso do dia */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Progresso do Dia {selectedDayIndex !== null ? days[selectedDayIndex].number : ""}</Text>

            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder={`Respiração (0 a ${respiracaoCount})`}
              value={inputRespiracao}
              onChangeText={setInputRespiracao}
              maxLength={2}
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder={`Modo Foco (0 a ${modoFocoCount})`}
              value={inputModoFoco}
              onChangeText={setInputModoFoco}
              maxLength={2}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#7B339C" }]}
                onPress={async () => {
                  if (selectedDayIndex === null) return;

                  const resp = parseInt(inputRespiracao, 10);
                  const foco = parseInt(inputModoFoco, 10);

                  if (
                    isNaN(resp) ||
                    resp < 0 ||
                    resp > respiracaoCount ||
                    isNaN(foco) ||
                    foco < 0 ||
                    foco > modoFocoCount
                  ) {
                    Alert.alert(
                      "Erro",
                      `Digite valores válidos:\nRespiração: 0-${respiracaoCount}\nModo Foco: 0-${modoFocoCount}`
                    );
                    return;
                  }

                  const newDays = [...days];
                  newDays[selectedDayIndex].progressoRespiracao = resp;
                  newDays[selectedDayIndex].progressoModoFoco = foco;

                  setDays(newDays);
                  await salvarProgressoNoFirebase(newDays);

                  setModalVisible(false);
                  setInputRespiracao("");
                  setInputModoFoco("");
                }}
              >
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal de configuração da trilha */}
      <Modal visible={configModalVisible} transparent animationType="fade">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Configurar Trilha</Text>

            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Quantidade de dias (1-100)"
              value={inputDays}
              onChangeText={setInputDays}
              maxLength={3}
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Quantidade Respiração (0-20)"
              value={inputRespiracao}
              onChangeText={setInputRespiracao}
              maxLength={2}
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Quantidade Modo Foco (0-20)"
              value={inputModoFoco}
              onChangeText={setInputModoFoco}
              maxLength={2}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#7B339C" }]}
                onPress={confirmConfig}
              >
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                onPress={() => setConfigModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}
