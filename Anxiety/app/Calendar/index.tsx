// React & React Native
import { useEffect, useState } from "react";
import { Alert, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

// Navegação
import { useNavigation } from "@react-navigation/native";
import { useRouter } from 'expo-router';

// Firebase
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

// Estilo e Animações
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from "react-native-animatable";
import { styles } from "../../styles/calendarStyles";

// Calendário
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { ptBR } from "../../localeCalendarConfig";

// Ícones
import { Feather, Ionicons } from "@expo/vector-icons";

// Configurações de idioma do calendário
LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

export default function CalendarScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const [day, setDay] = useState<DateData>();
  const [moodColor, setMoodColor] = useState("");
  const [note, setNote] = useState("");
  const [marked, setMarked] = useState<Record<string, any>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const userId = auth.currentUser?.uid;

  // Busca os dados salvos do calendário no Firestore
  useEffect(() => {
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
              customStyles: {
                container: {
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: data.mood,
                },
                text: {
                  color: "#000",
                  fontWeight: "bold",
                },
              },
            };
          }
        });

        // Marca o dia de hoje, se não houver
        if (!marks[today]) {
          marks[today] = {
            customStyles: {
              container: {
                backgroundColor: "#333",
                borderRadius: 10,
                opacity: 0.3,
              },
              text: {
                color: "#ccc",
              },
            },
          };
        }

        setMarked(marks);
      } catch (err) {
        console.error("Erro ao carregar dados do calendário:", err);
      }
    };

    fetchMarkedDates();
  }, [userId]);

  // Voltar com alerta de alterações não salvas
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

  // Opções de humor
  const moodOptions = [
    { label: "😊 Bom", color: "#A0E7E5", emoji: "😊" },
    { label: "😐 Neutro", color: "#FFDAC1", emoji: "😐" },
    { label: "😞 Ruim", color: "#FF9AA2", emoji: "😞" },
    { label: "😡 Muito Ruim", color: "#FF6F61", emoji: "😡" },
  ];

  // Ao tocar em um dia do calendário
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

  // Salvar humor e anotação no Firestore
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
        emoji: moodOptions.find((opt) => opt.color === moodColor)?.emoji,
        note,
      }, { merge: true });

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

  // Customização do dia no calendário
  function CustomDay({ date, state, onPress, marking }) {
    const isSelected = marking?.selected;
    const moodColor = marking?.dotColor;

    return (
      <TouchableOpacity onPress={() => onPress(date)} activeOpacity={0.7}>
        <View
          style={{
            borderWidth: 2,
            borderColor: isSelected ? moodColor || "#3E2E45" : "#4a3b50",
            borderRadius: 8,
            padding: 6,
            backgroundColor: isSelected ? moodColor || "#3E2E45" : "transparent",
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: isSelected ? "#fff" : state === "disabled" ? "#aaa" : "#e8e8e8",
              fontWeight: isSelected ? "bold" : "normal",
            }}
          >
            {date.day}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  // Render da tela principal
  return (
    <LinearGradient colors={['#1c0e2f', '#3a274d']} style={{ flex: 1 }}>
      <Animatable.View animation="fadeInUp" duration={600} style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={{ marginTop: 100, marginBottom: 20, paddingHorizontal: 24 }}>
          <Text style={styles.titleH1}>Como foi seu dia hoje?</Text>
          <Text style={styles.titleH2}>Registre seu humor e pensamentos</Text>
        </View>

        <Calendar
          style={styles.calendar}
          markingType="custom"
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
          dayComponent={({ date, state, marking, onPress }) => (
            <CustomDay date={date} state={state} marking={marking} onPress={onPress} />
          )}
          hideExtraDays
        />

        {/* Exibe anotação do dia */}
        {day?.dateString && note ? (
          <View style={styles.annotationContainer}>
            <Text style={styles.annotationTitle}>Anotação para {day.dateString}:</Text>
            <Text style={styles.annotationText}>{note}</Text>
          </View>
        ) : null}

        {/* Modal de seleção de humor e anotação */}
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

              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={handleSave} activeOpacity={0.7} style={[styles.buttonBox, { backgroundColor: "#A0E7E5" }]}>
                  <Text style={styles.buttonText}>✅ Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setModalVisible(false)} activeOpacity={0.7} style={[styles.buttonBox, { backgroundColor: "#FF9AA2" }]}>
                  <Text style={styles.buttonText}>❌ Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </Animatable.View>
    </LinearGradient>
  );
}
