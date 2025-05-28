import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/Ionicons";
import { auth, db } from "../../firebaseConfig";
import { styles } from "../../styles/signupStyles";

export default function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Email inválido", "Digite um email válido!");
      return;
    }

    if (password !== confirmPassword) {
      return Alert.alert("As senhas não coincidem!");
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), { name, email }, { merge: true});

      Alert.alert("Sucesso", "Conta criada com sucesso!");
      router.push("/SignIn");
    } catch (error: any) {
      console.error(error);
      Alert.alert("Erro ao cadastrar", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" style={styles.containerHeader}>
        <Text style={styles.message}>Cadastre-se!</Text>
      </Animatable.View>

      <Animatable.View
        delay={500}
        animation="fadeInUp"
        style={styles.containerForm}
      >
        <Text style={styles.title}>Nome</Text>
        <TextInput
          style={[styles.input, focusedField === "name" && styles.inputFocused]}
          placeholder="Digite seu nome"
          value={name}
          onChangeText={setName}
          onFocus={() => setFocusedField("name")}
          onBlur={() => setFocusedField(null)}
        />

        <Text style={styles.title}>Email</Text>
        <TextInput
          style={[
            styles.input,
            focusedField === "email" && styles.inputFocused,
          ]}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
        />

        <Text style={styles.title}>Senha</Text>
        <View
          style={[
            styles.passwordContainer,
            focusedField === "password" && styles.inputFocused,
          ]}
        >
          <TextInput
            style={styles.inputPassword}
            placeholder="Digite sua senha"
            secureTextEntry={hidePassword}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
          />
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Icon
              name={hidePassword ? "eye-off" : "eye"}
              size={25}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Confirmar Senha</Text>
        <View
          style={[
            styles.passwordContainer,
            focusedField === "confirm" && styles.inputFocused,
          ]}
        >
          <TextInput
            style={styles.inputPassword}
            placeholder="Confirme sua senha"
            secureTextEntry={hideConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={() => setFocusedField("confirm")}
            onBlur={() => setFocusedField(null)}
          />
          <TouchableOpacity
            onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
          >
            <Icon
              name={hideConfirmPassword ? "eye-off" : "eye"}
              size={25}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Animatable.Text
              animation="pulse"
              iterationCount="infinite"
              style={styles.buttonText}
            >
              Cadastrar
            </Animatable.Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => router.push("/SignIn")}
        >
          <Text style={styles.registerText}>
            Já possui uma conta? Faça login
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
