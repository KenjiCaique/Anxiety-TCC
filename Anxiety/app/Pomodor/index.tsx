// React e hooks principais
import React, { useEffect, useState } from 'react';

// Ícones e navegação
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Componentes do React Native
import { Modal, Text, TouchableOpacity, View } from 'react-native';

// Biblioteca para progress circular animado
import { AnimatedCircularProgress } from 'react-native-circular-progress';

// Estilos específicos da tela Pomodor
import { styles } from '../../styles/pomodorStyles';

export default function Pomodor() {
  const router = useRouter();

  // Estados do timer, progresso e ciclos concluídos
  const [segundosRestantes, setSegundosRestantes] = useState(1500);
  const [rodando, setRodando] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [tempoTotal, setTempoTotal] = useState(1500);
  const [ciclos, setCiclos] = useState(0);

  // Estados para modal de configuração do tempo
  const [modalVisible, setModalVisible] = useState(false);
  const [tempMinutos, setTempMinutos] = useState(25);
  const [tempSegundos, setTempSegundos] = useState(0);

  // Estado para modal de ajuda
  const [helpModalVisible, setHelpModalVisible] = useState(false);

  // Efeito para controle do timer e atualização do progresso
  useEffect(() => {
    let intervalo: NodeJS.Timeout;

    if (rodando && segundosRestantes > 0) {
      intervalo = setInterval(() => {
        setSegundosRestantes((prev) => {
          const novoTempo = prev - 1;
          setProgresso(((tempoTotal - novoTempo) / tempoTotal) * 100);
          return novoTempo;
        });
      }, 1000);
    }

    if (rodando && segundosRestantes === 0) {
      setCiclos((prev) => prev + 1);
      setRodando(false);
    }

    return () => clearInterval(intervalo);
  }, [rodando, segundosRestantes, tempoTotal]);

  // Formata segundos para mm:ss
  const formatarTempo = (totalSegundos: number) => {
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    return `${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`;
  };

  // Reseta timer para o tempo total definido
  const reiniciarTimer = () => {
    setSegundosRestantes(tempoTotal);
    setRodando(false);
    setProgresso(0);
  };

  // Aplica o novo tempo definido pelo usuário
  const aplicarNovoTempo = () => {
    const total = tempMinutos * 60 + tempSegundos;
    setTempoTotal(total);
    setSegundosRestantes(total);
    setProgresso(0);
    setRodando(false);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>

      {/* Botão de ajuda */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 50,
          right: 20,
          backgroundColor: '#8A2BE2',
          width: 40,
          height: 40,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        }}
        onPress={() => setHelpModalVisible(true)}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24 }}>?</Text>
      </TouchableOpacity>

      {/* Botão para voltar à tela anterior */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Título e contador de ciclos */}
      <Text style={styles.titulo}>POMODORO</Text>
      <Text style={styles.ciclos}>Ciclos: {ciclos}</Text>

      {/* Timer com progresso circular e modal de ajuste de tempo */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <AnimatedCircularProgress
          backgroundColor="#FFF"
          width={15}
          size={250}
          fill={progresso}
          tintColor="#9121c4"
          rotation={0}
          style={styles.circularProgress}
        >
          {() => (
            <View style={styles.centro}>
              <Text style={styles.tempo}>{formatarTempo(segundosRestantes)}</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </TouchableOpacity>

      {/* Botão para iniciar/pausar o timer */}
      <TouchableOpacity style={styles.botao} onPress={() => setRodando(!rodando)}>
        <Text style={[styles.textoBotao, { color: rodando ? 'tomato' : 'green' }]}>
          {rodando ? 'Pausar' : 'Iniciar'}
        </Text>
      </TouchableOpacity>

      {/* Botão para reiniciar o timer */}
      <TouchableOpacity style={styles.botao} onPress={reiniciarTimer}>
        <Text style={styles.textoBotao}>Reiniciar</Text>
      </TouchableOpacity>

      {/* Modal para ajuste de tempo */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalFundo}>
          <View style={styles.modalConteudo}>
            <Text style={styles.modalTitulo}>Definir Tempo</Text>

            <View style={styles.relogio}>
              <TouchableOpacity onPress={() => setTempMinutos((m) => Math.min(m + 1, 59))}>
                <Text style={styles.botaoRelogio}>▲</Text>
              </TouchableOpacity>
              <Text style={styles.tempoRelogio}>{String(tempMinutos).padStart(2, '0')}</Text>
              <TouchableOpacity onPress={() => setTempMinutos((m) => Math.max(m - 1, 0))}>
                <Text style={styles.botaoRelogio}>▼</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.separador}>:</Text>

            <View style={styles.relogio}>
              <TouchableOpacity onPress={() => setTempSegundos((s) => (s + 5) % 60)}>
                <Text style={styles.botaoRelogio}>▲</Text>
              </TouchableOpacity>
              <Text style={styles.tempoRelogio}>{String(tempSegundos).padStart(2, '0')}</Text>
              <TouchableOpacity onPress={() => setTempSegundos((s) => (s - 5 + 60) % 60)}>
                <Text style={styles.botaoRelogio}>▼</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.botaoSalvar} onPress={aplicarNovoTempo}>
              <Text style={styles.textoBotao}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de ajuda com explicação da tela */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={helpModalVisible}
        onRequestClose={() => setHelpModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 30,
              width: '80%',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 15 }}>
              Sobre esta tela
            </Text>
            <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 20 }}>
              Esta tela ajuda você a melhorar a concentração durante o estudo, utilizando a técnica
              Pomodoro, que alterna períodos de foco e descanso para aliviar a ansiedade durante o
              estudo e aumentar a produtividade.
            </Text>

            <TouchableOpacity
              onPress={() => setHelpModalVisible(false)}
              style={{
                backgroundColor: '#2f0635',
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
