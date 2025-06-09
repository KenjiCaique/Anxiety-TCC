// Imports do Firebase para manipulação do Firestore e autenticação
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

// Imports React e hooks essenciais
import React, { useEffect, useState } from 'react';

// Ícones do Expo Vector Icons para interface
import { Ionicons } from "@expo/vector-icons";

// Componentes básicos do React Native para UI
import { Image, ImageSourcePropType, Modal, Text, TouchableOpacity, View } from "react-native";

// Animações com react-native-animatable
import * as Animatable from 'react-native-animatable';

// Estilos específicos da tela Profile
import { styles } from '../../styles/profileStyles';

// Hook de navegação do Expo Router
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();

  // Estados principais: nome do usuário, loading, imagem do perfil, modal visível, índice da imagem atual
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [profileImage, setProfileImage] = useState<ImageSourcePropType>(require('../../images/axolote1.jpg'));
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Opções de imagens disponíveis para perfil
  const imageOptions: { [key: string]: ImageSourcePropType } = {
    'profile1.png': require('../../images/axolote1.jpg'),
    'profile2.png': require('../../images/axolote2.jpg'),
    'profile3.png': require('../../images/axolote3.jpg'),
    'profile4.png': require('../../images/axolote4.jpg'),
    'profile5.png': require('../../images/axolote5.png'),
    'profile6.png': require('../../images/axolote6.jpg'),
    'profile7.png': require('../../images/axolote7.jpg'),
    'profile8.png': require('../../images/axolote8.jpg'),
  };
  const imageNames = Object.keys(imageOptions);

  // Hook para buscar dados do usuário no Firestore ao montar o componente
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
            // Define a imagem de perfil baseada no nome salvo ou padrão
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

  // Função para deslogar usuário e navegar para tela de login
  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/SignIn');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Atualiza a imagem de perfil no estado e Firestore ao selecionar uma nova
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

  // Renderiza loading enquanto dados não carregam
  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <Animatable.View delay={200} animation='fadeInLeft' style={styles.container}>

      {/* Botão voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      {/* Modal para seleção da imagem do perfil */}
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
              {/* Botão para navegar imagens para trás */}
              <TouchableOpacity
                onPress={() => setCurrentImageIndex((prev) => (prev - 1 + imageNames.length) % imageNames.length)}
                style={{ padding: 10 }}
              >
                <Ionicons name="chevron-back" size={30} color="#7b339c" />
              </TouchableOpacity>

              {/* Imagem do perfil animada, clicável para seleção */}
              <Animatable.View animation="pulse" iterationCount="infinite" duration={2000}>
                <TouchableOpacity onPress={() => handleImageSelect(imageNames[currentImageIndex])}>
                  <Image
                    source={imageOptions[imageNames[currentImageIndex]]}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 60,
                      borderWidth: 3,
                      borderColor: '#7b339c',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.2,
                      shadowRadius: 6,
                      transform: [{ scale: 1.05 }],
                    }}
                  />
                </TouchableOpacity>
              </Animatable.View>

              {/* Botão para navegar imagens para frente */}
              <TouchableOpacity
                onPress={() => setCurrentImageIndex((prev) => (prev + 1) % imageNames.length)}
                style={{ padding: 10 }}
              >
                <Ionicons name="chevron-forward" size={30} color="#7b339c" />
              </TouchableOpacity>
            </View>

            {/* Botão cancelar modal */}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 20 }}>
              <Text style={{ color: '#7b339c', fontWeight: 'bold' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Imagem de perfil principal, abre modal ao clicar */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          source={profileImage}
          style={[styles.profileImage, styles.profileImageShadow]}
        />
      </TouchableOpacity>

      {/* Nome do usuário */}
      <View style={styles.profileContainer}>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      {/* Card "Sobre Nós" */}
      <View style={styles.card}>
        <Text style={styles.aboutTitle}>Sobre Nós</Text>
        <Text style={styles.aboutText}>
          Somos estudantes de Desenvolvimento de Sistemas. Este é o protótipo do nosso app para o TCC. Aproveite!
        </Text>
      </View>

      {/* Botões para alterar senha e logout */}
      <View style={{ width: '100%', marginTop: 20 }}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

    </Animatable.View>
  );
}
