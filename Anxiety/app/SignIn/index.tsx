// React e hooks
import React, { useState } from "react";

// Navegação com Expo Router
import { useRouter } from "expo-router";

// Componentes e APIs do React Native
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

// Animações com react-native-animatable
import * as Animatable from "react-native-animatable";

// Estilos externos
import { styles } from "../../styles/signinStyles";

// Firebase: autenticação
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push("/Dashboard");
      })
      .catch((error) => {
        let message = "Ocorreu um erro. Tente novamente.";

        if (error.code === "auth/user-not-found") {
          message = "Usuário não encontrado.";
        } else if (error.code === "auth/wrong-password") {
          message = "Senha incorreta.";
        }

        Alert.alert("Erro no login", message);
      });
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}> Bem-Vindo(a) </Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder="Digite seu email"
          placeholderTextColor="#A9A9A9"
          style={[styles.input, { color: "black" }]}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          placeholderTextColor="#A9A9A9"
          style={[styles.input, { color: "black" }]}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => router.push("/SignUp")}
        >
          <Text>Não possui uma conta? Cadastre-se</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSenha} onPress={() => router.push('/UpdatePassword')}>
          <Text>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </Animatable.View>

    </View>
  );
}
