import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebaseConfig';

import { Ionicons } from "@expo/vector-icons";
import { Image, ImageSourcePropType, Modal, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { styles } from '../../styles/profileStyles';

import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [profileImage, setProfileImage] = useState<ImageSourcePropType>(require('../../images/axolote1.jpg'));
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


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

  if (loading) {
    return <Text>Carregando...</Text>;
  }

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
            borderRadius: 20,
            width: '90%',
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Escolha sua imagem</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                onPress={() => setCurrentImageIndex((prev) => (prev - 1 + imageNames.length) % imageNames.length)}
                style={{ padding: 10 }}
              >
                <Ionicons name="chevron-back" size={30} color="#7b339c" />
              </TouchableOpacity>

          <Animatable.View animation="pulse" iterationCount="infinite" duration={2000}>
              <TouchableOpacity onPress={() => handleImageSelect(imageNames[currentImageIndex])}>
                <Image
                  source={imageOptions[imageNames[currentImageIndex]]}
                  style={{ width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: '#7b339c', shadowColor: '#000', shadowOffset: { width: 0, height: 4}, shadowOpacity: 0.2, shadowRadius: 6, transform: [{ scale: 1.05 }] }}
                />
              </TouchableOpacity>
          </Animatable.View>

              <TouchableOpacity
                onPress={() => setCurrentImageIndex((prev) => (prev + 1) % imageNames.length)}
                style={{ padding: 10 }}
              >
                <Ionicons name="chevron-forward" size={30} color="#7b339c" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 20 }}>
              <Text style={{ color: '#7b339c', fontWeight: 'bold' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          source={profileImage}
          style={[styles.profileImage, styles.profileImageShadow]}
        />
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.aboutTitle}>Sobre Nós</Text>
        <Text style={styles.aboutText}>
          Somos estudantes de Desenvolvimento de Sistemas. Este é o protótipo do nosso app para o TCC. Aproveite!
        </Text>
      </View>

      <View style={{ width: '100%', marginTop: 20 }}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/UpdatePassword')}>
          <Ionicons name="key-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Alterar Senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

    </Animatable.View>
  );
}
