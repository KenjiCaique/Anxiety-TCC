// app/EmailChange.tsx

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { updateEmail } from 'firebase/auth';
import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { auth } from '../../firebaseConfig';

export default function EmailChange() {
  const router = useRouter();
  const [newEmail, setNewEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  const handleEmailChange = async () => {
    if (!newEmail) {
      Alert.alert('Erro', 'Digite um novo e-mail.');
      return;
    }

    try {
      setEmailLoading(true);
      const user = auth.currentUser;

      if (user) {
        await updateEmail(user, newEmail);
        Alert.alert('Sucesso', 'E-mail atualizado com sucesso!');
        setNewEmail('');
        router.push('/Dashboard');
      }
    } catch (error: any) {
      console.error('Erro ao atualizar o e-mail:', error);
      if (error.code === 'auth/requires-recent-login') {
        Alert.alert(
          'Erro',
          'Você precisa fazer login novamente para alterar o e-mail.'
        );
        router.push('/SignIn');
      } else {
        Alert.alert('Erro', 'Não foi possível alterar o e-mail.');
      }
    } finally {
      setEmailLoading(false);
    }
  };

  return (
  <View style={{ flex: 1 }}>
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => router.back()}
    >
      <Ionicons name="arrow-back" size={24} color="#333" />
    </TouchableOpacity>

    <Animatable.View
      animation="fadeInUp"
      duration={600}
      style={styles.emailChangeContainer}
    >
      <Text style={styles.aboutTitle}>Alterar E-mail</Text>
      <TextInput
        placeholder="Digite o novo e-mail"
        value={newEmail}
        onChangeText={setNewEmail}
        style={styles.emailInput}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleEmailChange}
        disabled={emailLoading}
      >
        <Text style={styles.logoutButtonText}>
          {emailLoading ? 'Alterando...' : 'Alterar E-mail'}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  </View>
    );

}

const styles = StyleSheet.create({
  emailChangeContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emailInput: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#7B339C',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
  position: 'absolute',
  top: 40, 
  left: 20,
  zIndex: 10,
},

});
