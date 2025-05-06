import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import * as Animatable from 'react-native-animatable';
import Fontisto from '@expo/vector-icons/Fontisto';
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    // Validação básica do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um email válido.');
      return;
    }
  
    // Validação da senha
    if (password.length < 6) {
      alert('A senha deve conter pelo menos 6 caracteres.');
      return;
    }
  
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuário cadastrado com sucesso!');
      router.push('//dashboard');
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        alert('Esse email já está em uso.');
      } else if (error.code === 'auth/invalid-email') {
        alert('Email inválido.');
      } else {
        alert('Erro ao criar conta. Tente novamente.');
      }
    }
  };  

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" style={styles.containerHeader}>
        <Text style={styles.message}>Cadastro</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <View style={styles.titleWithIcon}>
          <Text style={styles.title}>Email</Text>
          <Fontisto name="email" size={15} color="black" style={styles.iconemail} /> 
        </View>

        <TextInput
          placeholder="Digite um email..."
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister} onPress={() => router.push('//SignIn')}>
          <Text style={styles.registerText}>Já possui uma conta? Faça login</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#7B339C',
  },
  containerHeader:{
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF'
  },
  containerForm:{
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  title:{
    fontSize: 20,
    marginTop: 28,
  },
  input:{
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button:{
    backgroundColor: '#7B339C',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonRegister:{
    marginTop: 14,
    alignSelf: 'center'
  },
  registerText:{
    color: '#a1a1a1'
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconemail:{
    marginTop: 32,
    marginLeft: 5,
  },
});
