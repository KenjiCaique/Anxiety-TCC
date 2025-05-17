import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Dimensions,
  Modal,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { styles } from "./styles";

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

  const [totalDays, setTotalDays] = useState();
  const [respiracaoCount, setRespiracaoCount] = useState();
  const [modoFocoCount, setModoFocoCount] = useState();

  const [days, setDays] = useState<Day[]>(
    Array.from({ length: totalDays }, (_, i) => ({
      number: totalDays - i,
      status: i === 0 ? "unlocked" : "locked",
      progressoRespiracao: 0,
      progressoModoFoco: 0,
    }))
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [configModalVisible, setConfigModalVisible] = useState(false);
  const [inputDays, setInputDays] = useState("");
  const [inputRespiracao, setInputRespiracao] = useState("");
  const [inputModoFoco, setInputModoFoco] = useState("");
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

  function handleDayPress(dayNumber: number) {
    const index = days.findIndex((d) => d.number === dayNumber);
    if (days[index].status === "unlocked") {
      const newDays = days.slice();
      newDays[index].status = "completed";
      if (index + 1 < days.length && newDays[index + 1].status === "locked") {
        newDays[index + 1].status = "unlocked";
      }
      setDays(newDays);
    }
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

    setConfigModalVisible(false);
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

  const currentDayIndex = days.findIndex((d) => d.status === "unlocked");
  const totalHeight = days.length * verticalSpacing + 80;

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
    minHeight: totalHeight + 50,
    paddingBottom: 60,  // Ajuste o padding se necessário
  }}
  showsVerticalScrollIndicator={true}
>
  <View style={{ flex: 1, position: "relative", minHeight: totalHeight }}>
    {days.map((day, i) => {
      const pos = getPosition(i);
      const isCurrent = i === currentDayIndex;
      const isClickable = day.status !== "locked";

      return (
        <Animatable.View
        animation="fadeInUp"
        delay={i * 50}  // Ajuste o delay para um valor menor, ou aumente um pouco
        key={day.number}
        style={{
       position: "absolute",
       left: pos.x - 30,
        top: pos.y,
        alignItems: "center",
        }}
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

          {isCurrent && (
            <View style={styles.startBalloon}>
              <Text style={styles.startText}>START</Text>
            </View>
          )}
        </Animatable.View>
      );
    })}
  </View>
</ScrollView>

      <Animatable.View animation="fadeInUp" style={styles.botoes}>
        <TouchableOpacity onPress={openConfigModal}>
          <FontAwesome5 name="map" size={25} color="#7B339C" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Calendario")}>
          <FontAwesome5 name="calendar-alt" size={25} color="#7B339C" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Modo_foco")}>
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

      {/* Modal de progresso do dia */}
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
                    router.push("/Modo_foco");

                    const newDays = [...days];
                    newDays[selectedDayIndex].progressoModoFoco += 1;
                    setDays(newDays);
                  }
                  setModalVisible(false);
                }}
                style={[
                  styles.modalButton,
                  days[selectedDayIndex].progressoModoFoco >= modoFocoCount &&
                    styles.modalButtonDisabled,
                ]}
              >
                <Text>Modo Foco</Text>
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
              placeholder="Qtd. vezes Modo Foco (0-20)"
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
