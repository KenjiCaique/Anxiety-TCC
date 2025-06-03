
# Anxiety-TCC

**Trabalho de Conclusão de Curso - Desenvolvimento de Sistemas**

## ✅ Versão dos Aplicativos Utilizados:

- **Node.js**: 22.14.0  
- **React Native**: 0.79.2  
- **Expo SDK**: 53  
- **Visual Studio Code**: Última versão recomendada  
- **Firebase**: (sem versão específica)

---

## 📚 Índice

1. [Visão Geral](#1-visão-geral)  
2. [Tecnologias Usadas](#2-tecnologias-usadas)  
3. [Instalação e Configuração](#3-instalação-e-configuração)  
4. [Estrutura do Projeto](#4-estrutura-do-projeto)  
5. [Componentes](#5-componentes)  
6. [Rotas e Navegação](#6-rotas-e-navegação)  
7. [Gerenciamento de Estado](#7-gerenciamento-de-estado)  
8. [Scripts e Comandos](#8-scripts-e-comandos)  
9. [Testes](#9-testes)  
10. [Contribuindo](#10-contribuindo)  
11. [Licença](#11-licença)  

---

## 1. Visão Geral

Este projeto é uma aplicação Android construída com **Expo (React Native)**.  
Tem como objetivo fornecer uma plataforma para **gerenciamento da ansiedade**, com foco em técnicas de relaxamento que auxiliam durante os estudos.

---

## 2. Tecnologias Usadas

- **React Native**: Framework JavaScript para construção da interface do usuário.  
- **Expo**: Plataforma para apps React Native com APIs prontas.  
- **Firebase**: Backend com autenticação, banco de dados e armazenamento em nuvem.  
- **Node.js**: Usado para executar scripts e gerenciar dependências.  
- **Visual Studio Code**: Editor de código recomendado com suporte a plugins e depuração.

---

## 3. Instalação e Configuração

### 1. Clonar o Repositório

```bash
git clone https://github.com/KenjiCaique/Anxiety-TCC.git
```

### 2. Instalar Dependências

```bash
cd Anxiety-TCC
npm install
# ou
yarn install
```

### 3. Rodar o Projeto

```bash
npx expo start
```

### 4. Acessar no navegador

```
http://localhost:<porta>
```

---

## 4. Estrutura do Projeto

```
Anxiety/
├── .vscode/                    # Configurações do VSCode
├── app/                        # Telas e navegação principal
│   ├── Calendar/
│   │   └── index.tsx
│   ├── Dashboard/
│   │   └── index.tsx
│   ├── Pomodoro/
│   │   └── index.tsx
│   ├── Profile/
│   │   └── index.tsx
│   ├── Respiracao/
│   │   └── index.tsx
│   ├── SignIn/
│   │   └── index.tsx
│   ├── SignUp/
│   │   └── index.tsx
│   ├── UpdatePassword/
│   │   └── index.tsx
│   ├── Welcome/
│   │   └── index.tsx
│   ├── _layout.tsx
│   └── index.tsx
├── assets/
├── images/
├── styles/
├── firebaseConfig.ts
├── localeCalendarConfig.ts
├── package.json
├── tsconfig.json
├── app.json
├── eslint.config.js
├── .gitignore
└── README.md
```

---

## 5. Componentes

A estrutura de componentes é organizada em pastas dentro da pasta `app/`, cada uma representando uma funcionalidade:

### 📅 `Calendar/`  
Exibe o progresso diário do usuário via calendário.  
Utiliza `localeCalendarConfig.ts` para localização.

### 📊 `Dashboard/`  
Tela principal após login, com resumo e atalhos para funcionalidades como Pomodoro, respiração e progresso.

### ⏱ `Pomodoro/`  
Implementa a técnica de foco com temporizador Pomodoro e intervalos de descanso.

### 👤 `Profile/`  
Exibe informações do usuário, configurações e botão de logout.

### 🌬 `Respiracao/`  
Tela com instruções visuais e exercícios guiados de respiração.

### 🔐 `SignIn/` e `SignUp/`  
Telas de login e cadastro integradas ao Firebase Authentication.

### 🔁 `UpdatePassword/`  
Permite redefinição de senha via Firebase com envio de e-mail.

### 🎉 `Welcome/`  
Tela inicial (onboarding) que introduz o app e direciona para login ou cadastro.

---

## 6. Rotas e Navegação

A navegação é feita com o **Expo Router**, que utiliza a estrutura de pastas como base de rotas:

```
app/
├── Calendar/
│   └── index.tsx        -> /Calendar
├── Dashboard/
│   └── index.tsx        -> /Dashboard
├── Pomodoro/
│   └── index.tsx        -> /Pomodoro
├── Profile/
│   └── index.tsx        -> /Profile
├── Respiracao/
│   └── index.tsx        -> /Respiracao
├── SignIn/
│   └── index.tsx        -> /SignIn
├── SignUp/
│   └── index.tsx        -> /SignUp
├── UpdatePassword/
│   └── index.tsx        -> /UpdatePassword
├── Welcome/
│   └── index.tsx        -> /Welcome
├── _layout.tsx          -> Define o layout padrão
└── index.tsx            -> Rota inicial (/)
```

---

## 7. Gerenciamento de Estado

A aplicação utiliza **hooks nativos do React** para controle de estado:

- `useState`: Armazena estados locais como inputs, login, progresso, etc.
- `useEffect`: Executa efeitos como chamadas assíncronas e integração com Firebase.

### Exemplo:

```tsx
const [progresso, setProgresso] = useState(0);

useEffect(() => {
  const carregarProgresso = async () => {
    const dados = await buscarProgressoDoFirebase();
    setProgresso(dados);
  };
  carregarProgresso();
}, []);
```

---

## 8. Scripts e Comandos

```bash
npx expo start     # Inicia o projeto no Expo
```

---

## 9. Testes

Os testes são realizados conforme o avanço das versões. Foram utilizadas as seguintes ferramentas:

- **Jest**: Testes unitários e funções lógicas.  
- **React Native Testing Library**: Testes de interface e interações.  
- **Detox**: Testes end-to-end (E2E) em dispositivos reais/emuladores.

---

## 10. Contribuindo

Este projeto foi desenvolvido em grupo como parte do Trabalho de Conclusão de Curso (TCC) do curso de **Desenvolvimento de Sistemas**.

### 👨‍💻 Integrantes do Grupo:

- **Isaac** – Desenvolvimento geral, lógica da aplicação e integração com Firebase  
- **Caique** – Interface com React Native, testes e responsividade  
- **Alison** – Documentação geral  
- **Leonardo** – Interface com Expo e testes  

Todos participaram ativamente do desenvolvimento e das decisões do projeto.

---

## 11. Licença

Este projeto está licenciado sob a **Licença MIT**.  
Consulte o arquivo `LICENSE` para mais informações.

---
