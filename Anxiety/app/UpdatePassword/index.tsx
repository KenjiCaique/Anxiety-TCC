import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  signInWithEmailAndPassword,
  updatePassword
} from 'firebase/auth';
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

export default function PasswordChangeScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    if (!email || !currentPassword || !newPassword) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(auth, email, currentPassword);
      const user = userCredential.user;

      await updatePassword(user, newPassword);

      Alert.alert('Sucesso', 'Senha atualizada com sucesso! Faça login novamente.');
      await auth.signOut();
      router.replace('/SignIn');
    } catch (error: any) {
      console.error('Erro ao atualizar a senha:', error.code);
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Erro', 'Senha atual incorreta.');
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert('Erro', 'Usuário não encontrado.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Erro', 'A nova senha deve ter pelo menos 6 caracteres.');
      } else {
        Alert.alert('Erro', 'Não foi possível alterar a senha.');
      }
    } finally {
      setLoading(false);
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
        style={styles.container}
      >
        <Text style={styles.title}>Alterar Senha</Text>

        <TextInput
          placeholder="Seu e-mail"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Senha atual"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
          style={styles.input}
        />

        <TextInput
          placeholder="Nova senha"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handlePasswordChange}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Alterando...' : 'Alterar Senha'}
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#7B339C',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
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
