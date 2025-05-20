import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
