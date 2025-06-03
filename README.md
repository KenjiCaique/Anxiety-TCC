# Anxiety-TCC
Trabalho conclusão de curso Desenvolvimentos de Sistemas

    Versão dos aplicativos utilizados:
        - Node.js versão: 22.14.0
        - Reactive Native versão: 0.79.2 
        - Expo versão: SDK 53
        - Visual Studio Code ultima versão sempre necessária 
        - Firebase (não existe versão especificada)

# Índice

      1. Visão Geral

      2. Tecnologias Usadas

      3.  Instalação e Configuração

      4.  Estrutura do Projeto

      5.  Componentes

      6.  Rotas e Navegação

    7. Gerenciamento de Estado

    8. Scripts e Comandos

    9. Testes

    10. Contribuindo

    11. Licença

# Visão Geral

     Este projeto é uma aplicação android construída com Expo(React Native). Ele tem como objetivo fornecer uma plataforma para gereciamento de controle de ansiedade. O projeto permite que os usuários consiga auxiliar
    sua ansiedade com tecnicas de relaxamento durante os estudos.

# Tecnologias Usadas

        ° React Native: Framework Javascript para construção da interface do usuário.
        ° Expo: Framework do Reactive Native tendo uma grande bliblioteca e APIs.
        ° Firebase: É um banco de dados e hospedagem em nuvem da google.
        ° Node.js: Usado pelo Framework Reative native para funções de algumas blibliotecas.
        ° Visual Studio Code: É um editor de texto/código com melhor visibilidade e amplos jeitos de personalização.

        
# Instalação e Configuração

1. Clonar o Repositório

        Git bash:
            git clone https://github.com/KenjiCaique/Anxiety-TCC.git

2. Verificar as Dependências

        abra o cmd na pasta 
            npm install
            # ou
            yarn install

3. Rodar o Projeto

        npm start

4. Abrir o projeto na web

        http://localhost: (porta definida)

 # Estrutura do Projeto 
    
    Anxiety/
├── .vscode/                      # Configurações do Visual Studio Code
├── app/                          # Contém todas as telas e navegação
│   ├── Calendar/                 # Tela e lógica do calendário de progresso
│   ├── Dashboard/               # Tela principal com resumo das funcionalidades
│   ├── Pomodoro/                # Tela do temporizador de foco (modo pomodoro)
│   ├── Profile/                 # Tela de perfil do usuário
│   ├── Respiracao/              # Tela com exercícios de respiração
│   ├── SignIn/                  # Tela de login
│   ├── SignUp/                  # Tela de cadastro
│   ├── UpdatePassword/          # Tela para redefinir a senha
│   ├── Welcome/                 # Tela de boas-vindas/inicial
│   ├── _layout.tsx              # Layout padrão das rotas (Expo Router)
│   └── index.tsx                # Ponto de entrada das rotas
├── assets/                      # Ícones, fontes, animações e outros arquivos estáticos
├── images/                      # Imagens usadas na aplicação
├── styles/                      # Estilos globais e temas
├── .gitignore                   # Arquivos e pastas ignoradas pelo Git
├── README.md                    # Documentação do projeto
├── app.json                     # Configurações do Expo
├── eslint.config.js             # Configurações do ESLint (padrões de código)
├── firebaseConfig.ts            # Configurações de acesso ao Firebase
├── localeCalendarConfig.ts      # Configurações de localização do calendário
├── metro.config.js              # Configurações do bundler Metro
├── package.json                 # Dependências e scripts do projeto
├── package-lock.json            # Travamento de dependências
└── tsconfig.json                # Configurações do TypeScript


 # Componentes 

    A aplicação foi dividida em componentes de telas, organizados em pastas dentro do diretório app/. Cada pasta representa uma funcionalidade ou etapa do fluxo de navegação. Abaixo estão os principais componentes e suas funções:

📅 Calendar/
Responsável por exibir e controlar o progresso diário do usuário através de um calendário. Pode incluir funcionalidades como:

Marcar dias com atividades concluídas.

Mostrar histórico visual de uso.

Utiliza configurações de localização em localeCalendarConfig.ts.

📊 Dashboard/
Tela principal da aplicação após o login. Apresenta um resumo das atividades e acesso rápido às funções:

Exibição do progresso do usuário.

Acesso rápido ao modo foco, respiração e calendário.

⏱ Pomodoro/
Componente que implementa o modo foco com técnica Pomodoro:

Temporizador de estudo.

Intervalos programados.

Controle de ciclo de foco.

👤 Profile/
Tela de perfil do usuário:

Exibe dados da conta.

Opções de configuração.

Botão de logout.

🌬 Respiracao/
Tela com exercícios de respiração guiados:

Técnicas de respiração para relaxamento.

Animações ou instruções visuais.

🔐 SignIn/ e SignUp/
Componentes de autenticação:

SignIn/: Tela de login.

SignUp/: Tela de cadastro de novos usuários.

Ambos conectam-se ao Firebase para autenticação.

🔁 UpdatePassword/
Componente que permite redefinir a senha:

Envia email de redefinição via Firebase.

🎉 Welcome/
Tela inicial de boas-vindas ou onboarding:

Apresenta brevemente o propósito do app.

Direciona o usuário para login ou cadastro.

⚙️ _layout.tsx e index.tsx
Arquivos relacionados à configuração das rotas:

_layout.tsx: Define a estrutura visual padrão para as telas (headers, tabs, etc).

index.tsx: Ponto de entrada da navegação principal.
 # Rotas e Navegação
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
├── _layout.tsx          -> Define o layout padrão da aplicação (ex: stack ou tab)
└── index.tsx            -> Tela inicial do app (/)


 # Gerenciamento de Estado 
 O gerenciamento de estado da aplicação foi feito utilizando apenas os hooks nativos do React:

useState: Para armazenar e controlar estados locais, como inputs, status de login, progresso diário, etc.

useEffect: Para lidar com efeitos colaterais, como carregamento de dados, autenticação com Firebase e inicializações ao montar componentes.

Esse método foi suficiente para a proposta do projeto, mantendo a estrutura leve e fácil de manter, sem a necessidade de bibliotecas externas como Redux ou Context API.

🧠 Exemplo:
tsx
Copiar
Editar
const [progresso, setProgresso] = useState(0);

useEffect(() => {
  // Buscar progresso do usuário no Firebase
  const carregarProgresso = async () => {
    const dados = await buscarProgressoDoFirebase();
    setProgresso(dados);
  };

  carregarProgresso();
}, []);

# Scripts e Comandos
    npx expo start # Inicia o app com o Expo
# Testes

Testes são feitos periodicamentes com base nos andamentos das versões do aplicativos. 

# Contribuindo 
Este projeto foi desenvolvido em grupo como parte do Trabalho de Conclusão de Curso (TCC) do curso de Desenvolvimento de Sistemas.

👨‍💻 Integrantes do Grupo:
Isaac – Desenvolvimento geral, lógica da aplicação e integração com Firebase.

Caique – Interface com React Native, testes e responsividade.

Alison – Documentação em geral.

Leonardo – Interface com Expo e testes.

Todos os membros participaram ativamente do desenvolvimento e das decisões do projeto.

# Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.  
    

