CREATE DATABASE anxiety_db;
USE anxiety_db;

-- Tabela de Usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    contato_emergencia VARCHAR(15),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Relatórios de Humor
CREATE TABLE relatorios_humor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    data_registro DATE NOT NULL,
    humor ENUM('feliz', 'triste', 'ansioso', 'estressado', 'neutro') NOT NULL,
    motivo TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela de Sessões de Respiração
CREATE TABLE sessoes_respiracao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    duracao_minutos INT NOT NULL,
    data_sessao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela do Modo Foco
CREATE TABLE modo_foco (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    duracao_minutos INT NOT NULL,
    data_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela da Trilha de Assistência
CREATE TABLE trilha_assistencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    atividade VARCHAR(255) NOT NULL,
    data_sugerida DATE NOT NULL,
    status ENUM('pendente', 'concluída') DEFAULT 'pendente',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);