import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { auth } from "../../firebaseConfig";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira seu e-mail.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (error: any) {
      console.error("Erro ao enviar email de recuperação:", error.code);
      if (error.code === "auth/user-not-found") {
        Alert.alert("Erro", "Usuário não encontrado.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Erro", "E-mail inválido.");
      } else {
        Alert.alert("Erro", "Não foi possível enviar o email.");
      }
    }
  };

  if (success) {
    return (
      <Animatable.View
        animation="fadeIn"
        duration={800}
        style={styles.successContainer}
      >
        <Ionicons name="mail-open" size={80} color="#7B339C" />
        <Text style={styles.successText}>
          Um link de redefinição foi enviado para seu e-mail.
        </Text>
        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={() => router.replace("/SignIn")}
        >
          <Text style={styles.buttonText}>Voltar ao login</Text>
        </TouchableOpacity>
      </Animatable.View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <Animatable.View
        animation="fadeInUp"
        duration={600}
        style={styles.container}
      >
        <Text style={styles.title}>Recuperar Senha</Text>

        <TextInput
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Enviar email de recuperação</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#7B339C",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  successContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  successText: {
    fontSize: 18,
    marginTop: 10,
    color: "#333",
    textAlign: "center",
  },
});
