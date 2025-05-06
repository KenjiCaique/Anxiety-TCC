import React from 'react';
import { Button, Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';


export default function Welcome() {
    const router = useRouter();
  
    return (
      <View style={styles.container}>

        <View style={styles.containerLogo}>
          <Animatable.Image
          animation="flipInY"
            source={require('./images/logo.png')}
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
  }

  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#7B339C'
    },
    containerLogo:{
      flex:2,
      backgroundColor: '#7B339C',
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerForm: {
      flex:1,
      backgroundColor: '#FFF',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingStart: '5%',
      paddingEnd: '5%'
    },
    title:{
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 28,
      marginBottom: 12,
    },
    text:{
      fontSize: 18,
      color: '#a1a1a1'
    },
    button:{
      position: 'absolute',
      backgroundColor: '#7B339C',
      borderRadius: 50,
      paddingVertical: 8,
      width: '60%',
      alignSelf: 'center',
      bottom: '15%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonText:{
      fontSize: 20,
      color: '#FFF',
      fontWeight: 'bold'
    }
  })