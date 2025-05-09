import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Animatable from 'react-native-animatable';

import { styles } from './styles';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';


export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   const router = useRouter();

  const handleLogin = () => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential)  => {
    const user = userCredential.user;
    console.log('Usuário logado:', user.email);
    router.push('/Dashboard')
  })
  .catch((error) => {
    console.error('Erro no login:', error.message);
    let message = 'Ocorreu um erro. Tente novamente.';
  
    if (error.code === 'auth/user-not-found') {
      message = 'Usuário não encontrado.';
    } else if (error.code === 'auth/wrong-password') {
      message = 'Senha incorreta.';
    }
  
    Alert.alert('Erro no login', message);
  });
  
  
};

    return (
      <View style={styles.container}>
        <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
          <Text style={styles.message}> Bem-Vindo(a) </Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" style={styles.containerForm}>
          <Text style={styles.title}>Email</Text>
          <TextInput
            placeholder='Digite seu email'
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.title}>Senha</Text>
          <TextInput
            placeholder='Digite sua senha'
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonRegister} onPress={() => router.push('/SignUp')}>
              <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
            </TouchableOpacity>

        </Animatable.View>

      </View>
    )
}