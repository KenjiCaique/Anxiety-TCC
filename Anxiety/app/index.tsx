import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkWelcome = async () => {
      try {
        const hasSeenWelcome = await AsyncStorage.getItem("hasSeenWelcome");

        if (!hasSeenWelcome) {
          // Primeira vez: salva a flag e vai para /Welcome
          await AsyncStorage.setItem("hasSeenWelcome", "true");
          router.replace("/Welcome");
        } else {
          // Já viu o Welcome: vai para SignIn (ou outra tela que quiser)
          router.replace("/SignIn");
        }
      } catch (e) {
        console.error("Erro ao checar AsyncStorage:", e);
        router.replace("/SignIn");
      } finally {
        setLoading(false);
      }
    };

    checkWelcome();
  }, []);

  // Evita piscada de tela
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}
