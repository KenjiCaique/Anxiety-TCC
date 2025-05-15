import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';


import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

export default function SignUp() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [hidePassword, setHidePassword] = useState(true);

    const router = useRouter();

    const handleSignUp = async () => {
        if (!name || !email || !password) {
            Alert.alert("Erro", "Preencha todos os campos!");
            return;
        }

        if (password !== confirmPassword) {
            return Alert.alert("As senhas não coincidem!");
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name,
                email
            });

            Alert.alert("Sucesso", "Conta criada com sucesso!");
            router.push('/Dashboard')
        } catch (error: any) {
            console.error(error);
            Alert.alert("Erro ao cadastrar", error.message);
        }
    };

    return (
    <View style={styles.container}>
      <Animatable.View animation='fadeInLeft' style={styles.containerHeader}>
        <Text style={styles.message}>Cadastre-se!</Text>
      </Animatable.View>

      <Animatable.View delay={ 500 } animation='fadeInUp' style={styles.containerForm}>
        <Text style={styles.title}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.title}>Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Digite sua senha"
            secureTextEntry={hidePassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Icon
              name={hidePassword ? 'eye-off' : 'eye'}
              size={25}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Confirmar Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Confirme sua senha"
            secureTextEntry={hidePassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Icon
              name={hidePassword ? 'eye-off' : 'eye'}
              size={25}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister} onPress={() => router.push('/SignIn')}>
          <Text style={styles.registerText}>Já possui uma conta? Faça login</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};