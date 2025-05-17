/* app/Welcome/index.tsx */


import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { styles } from '../../styles/welcomeStyles';

export default function Welcome() {
    const router = useRouter();

    return (

    <View style={styles.container}>

    <View style={styles.containerLogo}>
      <Animatable.Image
      animation="flipInY"
        source={require('@/images/logo.png')}
        style={{ width: '30%'}}
        resizeMode="contain"
      />
    </View>

    <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
      <Text style={styles.title}>Monitore seus estudos e gerencie sua Ansiedade!</Text>
      <Text style={styles.text}>Faça o login para começar</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/SignIn')}>
        
        <Text style={styles.buttonText}>Acessar</Text>
        
         </TouchableOpacity>

    </Animatable.View>

  </View>
    );  
};