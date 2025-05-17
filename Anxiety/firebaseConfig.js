// Importações corretas
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApps, initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAuIWmJAp7GlhJf3yuIN09Jbc8LY6APswk",
  authDomain: "anxiety-39a34.firebaseapp.com",
  projectId: "anxiety-39a34",
  storageBucket: "anxiety-39a34.firebasestorage.app",
  messagingSenderId: "709517919349",
  appId: "1:709517919349:web:3518b117f590c4370ee43c"
};

// Inicializando o Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Aqui está o segredo: auth com persistência usando AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Firestore
const db = getFirestore(app);

// Exporta tudo
export { app, auth, db };

