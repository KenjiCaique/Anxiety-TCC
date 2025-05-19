import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { auth, db } from "../../firebaseConfig";

import { ptBR } from "../../localeCalendarConfig";
import { styles } from "../../styles/calendarStyles";

// Configuração do calendário em pt-BR
LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

export default function CalendarScreen() {
  const navigation = useNavigation();
  const [day, setDay] = useState<DateData>();
  const [moodColor, setMoodColor] = useState("");
  const [note, setNote] = useState("");
  const [marked, setMarked] = useState<Record<string, any>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    // Carregar dados salvos do Firestore quando o componente monta
    const fetchMarkedDates = async () => {
      if (!userId) return;

      try {
        const q = query(collection(db, "users", userId, "calendar"));
        const querySnapshot = await getDocs(q);
        const marks: Record<string, any> = {};

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.date && data.mood) {
            marks[data.date] = {
              marked: true,
              dotColor: data.mood,
              selected: true,
              selectedColor: data.mood,
              note: data.note || "",
            };
          }
        });

        setMarked(marks);
      } catch (err) {
        console.error("Erro ao carregar dados do calendário:", err);
      }
    };

    fetchMarkedDates();
  }, [userId]);

  const handleBackPress = () => {
    if (unsavedChanges) {
      Alert.alert(
        "Descartar alterações?",
        "Você tem alterações não salvas. Deseja realmente sair?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Sair", style: "destructive", onPress: () => navigation.goBack() },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const moodOptions = [
    { label: "Bom", color: "green" },
    { label: "Neutro", color: "purple" },
    { label: "Ruim", color: "orange" },
    { label: "Muito Ruim", color: "red" },
  ];

  const handleDayPress = (selectedDay: DateData) => {
    setDay(selectedDay);
    const data = marked[selectedDay.dateString];
    if (data) {
      setMoodColor(data.selectedColor || "");
      setNote(data.note || "");
    } else {
      setMoodColor("");
      setNote("");
    }
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!day || !moodColor) {
      alert("Escolha um humor para salvar.");
      return;
    }

    if (!userId) {
      alert("Você precisa estar logado.");
      return;
    }

    const newMarked = {
      ...marked,
      [day.dateString]: {
        marked: true,
        dotColor: moodColor,
        selected: true,
        selectedColor: moodColor,
        note,
      },
    };

    setMarked(newMarked);
    setUnsavedChanges(true);

    try {
      await setDoc(doc(db, "users", userId, "calendar", day.dateString), {
        date: day.dateString,
        mood: moodColor,
        note,
      });
      setUnsavedChanges(false);
      setModalVisible(false);
      alert("Salvo com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Erro ao salvar no Firestore.");
    }

    setNote("");
    setMoodColor("");
  };

  return (
    <Animatable.View animation="fadeInUp" duration={600} style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity onPress={handleBackPress} style={{ marginBottom: 16 }}>
        <Feather name="arrow-left" size={24} color="#e8e8e8" />
      </TouchableOpacity>

      {/* Calendário */}
      <Calendar
        style={styles.calendar}
        markedDates={marked}
        onDayPress={handleDayPress}
        renderArrow={(direction) => (
          <Feather size={24} color="#e8e8e8" name={`chevron-${direction}`} />
        )}
        headerStyle={styles.calendarHeader}
        theme={{
          textMonthFontSize: 18,
          monthTextColor: "#e8e8e8",
          todayTextColor: "#3E2E45",
          selectedDayBackgroundColor: "#3E2E45",
          selectedDayTextColor: "#e8e8e8",
          arrowColor: "#e8e8e8",
          calendarBackground: "transparent",
          textDayStyle: { color: "#e8e8e8" },
          arrowStyle: { margin: 0, padding: 0 },
        }}
        hideExtraDays
      />

      {/* Anotação */}
      {day?.dateString && note ? (
        <View style={styles.annotationContainer}>
          <Text style={styles.annotationTitle}>Anotação para {day.dateString}:</Text>
          <Text style={styles.annotationText}>{note}</Text>
        </View>
      ) : null}

      {/* Modal */}
      <Modal transparent visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Como você se sentiu hoje?</Text>

            {moodOptions.map(({ label, color }) => (
              <Text
                key={label}
                style={[
                  styles.moodOption,
                  {
                    backgroundColor: moodColor === color ? color : "#4c3a50",
                    color: moodColor === color ? "#fff" : "#e8e8e8",
                    fontWeight: moodColor === color ? "bold" : "normal",
                  },
                ]}
                onPress={() => setMoodColor(color)}
              >
                {label}
              </Text>
            ))}

            <Text style={styles.inputLabel}>Escreva sobre o dia:</Text>
            <TextInput
              multiline
              numberOfLines={4}
              value={note}
              onChangeText={setNote}
              placeholder="Escreva aqui..."
              placeholderTextColor="#aaa"
              style={styles.input}
            />

            <TouchableOpacity onPress={handleSave} style={[styles.saveButton, { backgroundColor: "purple", marginTop: 16 }]}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.cancelButton, { marginTop: 8 }]}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Animatable.View>
  );
}
