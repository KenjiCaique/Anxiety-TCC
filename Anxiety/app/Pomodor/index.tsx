import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { styles } from '../../styles/pomodorStyles';

export default function Pomodor() {
    const [segundosRestantes, setSegundosRestantes] = useState(1500);
    const [rodando, setRodando] = useState(false);
    const [progresso, setProgresso] = useState(0);
    const [tempoTotal, setTempoTotal] = useState(1500);
    const [ciclos, setCiclos] = useState(0);

    const [modalVisible, setModalVisible] = useState(false);
    const [tempMinutos, setTempMinutos] = useState(25);
    const [tempSegundos, setTempSegundos] = useState(0);

    useEffect(() => {
        let intervalo;

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
    }, [rodando, segundosRestantes]);

    const formatarTempo = (totalSegundos: number) => {
        const minutos = Math.floor(totalSegundos / 60);
        const segundos = totalSegundos % 60;
        return `${minutos < 10 ? "0" + minutos : minutos}:${segundos < 10 ? "0" + segundos : segundos}`;
    };

    const reiniciarTimer = () => {
        setSegundosRestantes(tempoTotal);
        setRodando(false);
        setProgresso(0);
    };

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
            <Text style={styles.titulo}>POMODORO</Text>
            <Text style={styles.ciclos}>Ciclos: {ciclos}</Text>

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

            <TouchableOpacity style={styles.botao} onPress={() => setRodando(!rodando)}>
                <Text
                    style={[
                        styles.textoBotao,
                        { color: rodando ? 'tomato' : 'green' }
                    ]}
                >
                        {rodando ? "Pausar" : "Iniciar"}
                </Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.botao} onPress={reiniciarTimer}>
                <Text style={styles.textoBotao}>Reiniciar</Text>
            </TouchableOpacity>

            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={styles.modalFundo}>
                    <View style={styles.modalConteudo}>
                        <Text style={styles.modalTitulo}>Definir Tempo</Text>

                        <View style={styles.relogio}>
                            <TouchableOpacity onPress={() => setTempMinutos((m) => Math.min(m + 1, 59))}>
                                <Text style={styles.botaoRelogio}>▲</Text>
                            </TouchableOpacity>
                            <Text style={styles.tempoRelogio}>{String(tempMinutos).padStart(2, "0")}</Text>
                            <TouchableOpacity onPress={() => setTempMinutos((m) => Math.max(m - 1, 0))}>
                                <Text style={styles.botaoRelogio}>▼</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.separador}>:</Text>

                        <View style={styles.relogio}>
                            <TouchableOpacity onPress={() => setTempSegundos((s) => (s + 5) % 60)}>
                                <Text style={styles.botaoRelogio}>▲</Text>
                            </TouchableOpacity>
                            <Text style={styles.tempoRelogio}>{String(tempSegundos).padStart(2, "0")}</Text>
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
        </View>
    );
}
