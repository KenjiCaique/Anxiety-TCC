// Importa as funções necessárias
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAuIWmJAp7GlhJf3yuIN09Jbc8LY6APswk",
  authDomain: "anxiety-39a34.firebaseapp.com",
  projectId: "anxiety-39a34",
  storageBucket: "anxiety-39a34.appspot.com",
  messagingSenderId: "709517919349",
  appId: "1:709517919349:web:3518b117f590c4370ee43c"
};

// Inicializa o Firebase e exporta o auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
