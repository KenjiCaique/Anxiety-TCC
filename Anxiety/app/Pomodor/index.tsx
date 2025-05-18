import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

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
                <Text style={styles.textoBotao}>{rodando ? "Pausar" : "Iniciar"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={reiniciarTimer}>
                <Text style={styles.textoBotao}>Reiniciar</Text>
            </TouchableOpacity>

            {/* Modal para definir tempo */}
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7b339c',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    titulo: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    ciclos: {
        color: '#FFF',
        fontSize: 18,
        marginBottom: 20,
    },
    circularProgress: {
        marginBottom: 30,
    },
    centro: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tempo: {
        color: '#FFF',
        fontSize: 36,
        fontWeight: 'bold',
    },
    botao: {
        backgroundColor: '#FFF',
        paddingVertical: 12,
        width: 150,
        borderRadius: 8,
        marginBottom: 15,
    },
    textoBotao: {
        color: 'tomato',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalFundo: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalConteudo: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        width: 250,
    },
    modalTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    relogio: {
        alignItems: 'center',
    },
    tempoRelogio: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#333',
    },
    botaoRelogio: {
        fontSize: 24,
        color: '#9121c4',
        paddingVertical: 4,
    },
    separador: {
        fontSize: 36,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    botaoSalvar: {
        backgroundColor: '#9121c4',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
    },
    particulas: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
});
