import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebaseConfig';

import { Ionicons } from "@expo/vector-icons";
import { FlatList, Image, ImageSourcePropType, Modal, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { styles } from '../../styles/profileStyles';

import { useRouter } from 'expo-router';

export default function UserSideBar() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [profileImage, setProfileImage] = useState<ImageSourcePropType>(require('../../images/axolote1.jpg'));
  const [isModalVisible, setModalVisible] = useState(false);

  const imageOptions: { [key: string]: ImageSourcePropType } = {
    'profile1.png': require('../../images/axolote1.jpg'),
    'profile2.png': require('../../images/axolote2.jpg'),
    'profile3.png': require('../../images/axolote3.jpg'),
    'profile4.png': require('../../images/axolote4.jpg')
  }

  const imageNames = Object.keys(imageOptions);

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

            const imageName = userData.profileImage || 'profile1.png';
            setProfileImage(imageOptions[imageName]);
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

  const handleImageSelect = async (imageName: string) => {
    setProfileImage(imageOptions[imageName]);
    setModalVisible(false);

    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      try {
        await updateDoc(userDocRef, {
          profileImage: imageName,
        });
      } catch (error) {
        console.error('Erro ao salvar imagem:', error);
      }
    }
  };

  return (
    <Animatable.View delay={200} animation='fadeInLeft' style={styles.container}>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 10,
            width: '90%',
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Escolha sua imagem</Text>

            <FlatList
              data={imageNames}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleImageSelect(item)} style={{ marginHorizontal: 10 }}>
                  <Image
                    source={imageOptions[item]}
                    style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: '#7b339c' }}
                  />
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 20 }}>
              <Text style={{ color: '#7b339c', fontWeight: 'bold' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Animatable.Image
          source={profileImage}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>Sobre Nós</Text>
        <Text style={styles.aboutText}>
          Nós somos um grupo de estudantes de Desenvolvimento de Sistemas, esse é um protótipo do nosso aplicativo para o Trabalho de Conclusão de Curso. Aproveite!
        </Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => router.push('/UpdatePassword')}>
        <Text style={styles.logoutButtonText}>Altere sua senha!</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>LogOut</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
}
