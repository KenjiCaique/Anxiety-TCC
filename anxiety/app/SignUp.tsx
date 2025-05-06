import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import * as Animatable from 'react-native-animatable';
import Fontisto from '@expo/vector-icons/Fontisto';
import { firebase } from './firebaseConfig';





const handleRegister = async () => {
    const email = "user@example.com";  // Aqui você deve pegar o email do input
    const password = "your-password";  // Aqui você deve pegar a senha do input
  
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('Usuário cadastrado com sucesso!');
      // Você pode redirecionar para a tela de login ou para a tela inicial
    } catch (error) {
      console.error(error);
      alert('Erro ao criar conta. Verifique os dados inseridos.');
    }
  };
  