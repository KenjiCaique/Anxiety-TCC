import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebaseConfig';

import { Text, TouchableOpacity, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { styles } from './styles';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function UserSideBar() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('https://placeimg.com/100/100/people');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserName(userData.name);
            setProfileImage(userData.profileImage || 'https://placeimg.com/100/100/people');
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/SignIn');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <Animatable.View delay={200} animation='fadeInLeft' style={styles.container}>
      
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <Animatable.Image
          source={{ uri: profileImage }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>Sobre Nós</Text>
        <Text style={styles.aboutText}>
          Nós somos um grupo de estudantes de Desenvolvimento de Sistemas, esse é um protótipo do nosso aplicativo para o Trabalho de Conclusão de Curso. Aproveite!
        </Text>

        <Text style={styles.changeEmailText}>Deseja alterar seu e-mail?</Text>
        <TouchableOpacity style={styles.emailButton} onPress={() => router.push('./emailChange')}>
          <Text style={styles.emailButtonText}>Alterar E-mail</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
}
