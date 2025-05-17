// lib/firebaseConfig.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";

// Config do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAuIWmJAp7GlhJf3yuIN09Jbc8LY6APswk",
  authDomain: "anxiety-39a34.firebaseapp.com",
  projectId: "anxiety-39a34",
  storageBucket: "anxiety-39a34.appspot.com",
  messagingSenderId: "709517919349",
  appId: "1:709517919349:web:3518b117f590c4370ee43c",
};

// Inicializa app
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Auth diferenciado para Web e Mobile
let auth;
if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

const db = getFirestore(app);

export { app, auth, db };

