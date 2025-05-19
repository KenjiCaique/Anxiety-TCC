// firebaseConfig.ts

import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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

// Inicializa o app
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Usa o auth e firestore normalmente (sem persistência customizada)
const auth = getAuth(app);
const db = getFirestore(app);

// Exporta tudo
export { app, auth, db };

