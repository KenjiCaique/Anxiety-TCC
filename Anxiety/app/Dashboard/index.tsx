import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
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
import * as Animatable from "react-native-animatable";
import { styles } from '../../styles/dashboardStyles';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const screenWidth = Dimensions.get("window").width;

type DayStatus = "locked" | "unlocked" | "completed";

interface Day {
  number: number;
  status: DayStatus;
  progressoRespiracao: number;
  progressoModoFoco: number;
}

export default function Dashboard() {
  const router = useRouter();
  const auth = getAuth();

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

  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/SignIn");
        return;
      }

      setUserId(user.uid);
      await carregarProgresso(user.uid);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function carregarProgresso(uid: string) {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
  
      const hoje = new Date();
      const hojeStr = hoje.toISOString().split("T")[0]; // formato YYYY-MM-DD
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        const lastAccess = data.lastAccessDate || hojeStr;
  
        setTotalDays(data.totalDays);
        setRespiracaoCount(data.respiracaoCount);
        setModoFocoCount(data.modoFocoCount);
        setDays(data.days);
  
        // Verifica se passou pelo menos 1 dia
        if (lastAccess !== hojeStr) {
          const updatedDays = [...data.days];
          const nextLockedIndex = updatedDays.findIndex(
            (d) => d.status === "locked"
          );
  
          // Se houver um dia travado, desbloqueia ele
          if (nextLockedIndex !== -1) {
            updatedDays[nextLockedIndex].status = "unlocked";
            setDays(updatedDays);
            await setDoc(docRef, {
              ...data,
              days: updatedDays,
              lastAccessDate: hojeStr,
            });
          } else {
            // Só atualiza a data, se não tiver mais dias para desbloquear
            await setDoc(docRef, {
              ...data,
              lastAccessDate: hojeStr,
            });
          }
        }
  
      } else {
        // Documento não existe: cria novo
        await setDoc(docRef, {
          days: [],
          totalDays: 0,
          respiracaoCount: 0,
          modoFocoCount: 0,
          lastAccessDate: hojeStr,
        });
      }
    } catch (error) {
      console.error("Erro ao carregar progresso do Firebase:", error);
    }
  }
  

  async function salvarProgressoNoFirebase(
    updatedDays: Day[],
    newRespCount?: number,
    newModoFocoCount?: number
  ) {
    if (!userId) return;
  
    try {
      await setDoc(doc(db, "users", userId), {
        days: updatedDays,
        totalDays,
        respiracaoCount: newRespCount ?? respiracaoCount,
        modoFocoCount: newModoFocoCount ?? modoFocoCount,
        lastAccessDate: new Date().toISOString().split("T")[0],
      });      
    } catch (error) {
      console.error("Erro ao salvar progresso no Firebase:", error);
    }
  }

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}> 
        <ActivityIndicator size="large" color="#7B339C" />
      </View>
    );
  }

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
      isNaN(qDays) || qDays <= 0 || qDays > 100 ||
      isNaN(qResp) || qResp < 0 || qResp > 20 ||
      isNaN(qFoco) || qFoco < 0 || qFoco > 20
    ) {
      Alert.alert("Erro", "Digite valores válidos:\nDias: 1-100\nRespiração e Modo Foco: 0-20");
      return;
    }

    setTotalDays(qDays);
    setRespiracaoCount(qResp);
    setModoFocoCount(qFoco);

    const newDays = Array.from({ length: qDays }, (_, i) => ({
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
  if (!days || days.length === 0) return; 

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

  const verticalSpacing = 90;
  const getPosition = (index: number) => {
    const baseX = screenWidth / 2;
    const amplitudeX = 90;
    const stepY = 80;
    const y = stepY * index + 35 + (index === 0 ? 15 : 0);
    const x = baseX + amplitudeX * Math.sin((index * Math.PI) / 6);
    return { x, y };
  };

  // Garante que days seja sempre um array
  const safeDays = days ?? []; 

  const currentDayIndex = safeDays.findIndex((d) => d.status === "unlocked");
  const totalHeight = safeDays.length * verticalSpacing + 80;


  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation="fadeInLeft" style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push("/Profile")}>
          <Ionicons name="person-circle" size={45} color="white" />
        </TouchableOpacity>
      </Animatable.View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          minHeight: (days?.length ?? 0) * 90 + 130,
          paddingBottom: 60,
  }}
  showsVerticalScrollIndicator={true}
>
        <View style={{ flex: 1, position: "relative", minHeight: (days ?? []).length * 90 + 80 }}>
          {(days ?? []).map((day, i) => {
          const x = screenWidth / 2 + 90 * Math.sin((i * Math.PI) / 6) - 30;
          const y = 80 * i + 35 + (i === 0 ? 15 : 0);
          const currentIndex = (days ?? []).findIndex((d) => d.status === "unlocked");
          const isCurrent = i === currentIndex;
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
              <Text
                style={[
                  styles.dayNumber,
                  day.status === "locked" && styles.dayNumberLocked,
                ]}
              >
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

      <Animatable.View animation="fadeInUp" style={styles.botoes}>
        <TouchableOpacity onPress={openConfigModal}>
          <FontAwesome5 name="map" size={25} color="#7B339C" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Calendar")}>
          <FontAwesome5 name="calendar-alt" size={25} color="#7B339C" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Pomodor")}>
          <MaterialCommunityIcons
            name="school-outline"
            size={25}
            color="#7B339C"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Respiracao")}>
          <MaterialCommunityIcons name="clock" size={25} color="#7B339C" />
        </TouchableOpacity>
      </Animatable.View>

      {selectedDayIndex !== null && (
        <Modal visible={modalVisible} transparent animationType="fade">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.modalOverlay}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Escolha uma ação</Text>

              <TouchableOpacity
                disabled={
                  days[selectedDayIndex].progressoRespiracao >= respiracaoCount
                }
                onPress={() => {
                  if (
                    days[selectedDayIndex].progressoRespiracao < respiracaoCount
                  ) {
                    router.push("/Respiracao");

                    const newDays = [...days];
                    newDays[selectedDayIndex].progressoRespiracao += 1;
                    setDays(newDays);
                    salvarProgressoNoFirebase(newDays);
                  }
                  setModalVisible(false);
                }}
                style={[
                  styles.modalButton,
                  days[selectedDayIndex].progressoRespiracao >= respiracaoCount &&
                    styles.modalButtonDisabled,
                ]}
              >
                <Text>Respiração</Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={days[selectedDayIndex].progressoModoFoco >= modoFocoCount}
                onPress={() => {
                  if (days[selectedDayIndex].progressoModoFoco < modoFocoCount) {
                    router.push("/Pomodor");

                    const newDays = [...days];
                    newDays[selectedDayIndex].progressoModoFoco += 1;
                    setDays(newDays);
                    salvarProgressoNoFirebase(newDays);
                  }
                  setModalVisible(false);
                }}
                style={[
                  styles.modalButton,
                  days[selectedDayIndex].progressoModoFoco >= modoFocoCount &&
                    styles.modalButtonDisabled,
                ]}
              >
                <Text>Pomodoro</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.modalCancelButton}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      )}

      <Modal visible={configModalVisible} transparent animationType="fade">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Configurar Quantidades</Text>

            <TextInput
              keyboardType="number-pad"
              placeholder="Quantidade de dias"
              value={inputDays}
              onChangeText={setInputDays}
              style={styles.modalInput}
              placeholderTextColor="#BFA8E8"
            />

            <TextInput
              keyboardType="number-pad"
              placeholder="Qtd. vezes Respiração (0-20)"
              value={inputRespiracao}
              onChangeText={setInputRespiracao}
              style={styles.modalInput}
              placeholderTextColor="#BFA8E8"
            />

            <TextInput
              keyboardType="number-pad"
              placeholder="Qtd. vezes Podoro (0-20)"
              value={inputModoFoco}
              onChangeText={setInputModoFoco}
              style={styles.modalInput}
              placeholderTextColor="#BFA8E8"
            />
        <TouchableOpacity onPress={confirmConfig} style={styles.modalButton}>
          <Text>Confirmar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setConfigModalVisible(false)}
          style={styles.modalCancelButton}
        >
          <Text>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  </Modal>
</SafeAreaView>
);
}
