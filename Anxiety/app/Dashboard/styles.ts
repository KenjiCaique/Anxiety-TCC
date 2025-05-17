import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7B339C", // Alterei a cor de fundo para um tom roxo semelhante ao exemplo
  },

  containerLogo: {
    flex: 2,
    backgroundColor: "#7B339C", // Cor de fundo para a logo
    justifyContent: "center",
    alignItems: "center",
  },

  containerForm: {
    flex: 1,
    backgroundColor: "#FFF", // Fundo branco para a área do formulário
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%", // Alinha o formulário com um padding lateral
    paddingEnd: "5%", // Igual ao exemplo
  },

  title: {
    fontSize: 24, // Tamanho da fonte do título
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 12,
    color: "#7B339C", // Cor do título semelhante ao seu design
  },

  text: {
    fontSize: 18,
    color: "#a1a1a1", // Cor do texto
  },

 button: {
  position: "absolute",
  backgroundColor: "#7B339C",
  borderRadius: 50,
  paddingVertical: 8,
  width: "60%",
  alignSelf: "center",
  bottom: "15%",
  alignItems: "center",
  justifyContent: "center",

  // Profundidade
  elevation: 4, // Android
  shadowColor: "#000", // iOS
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3.84,
},


  buttonText: {
    fontSize: 20,
    color: "#FFF", // Cor do texto do botão
    fontWeight: "bold",
  },

  dayCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#D7BFF7",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",

    elevation: 4, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },

  dayCompleted: {
    backgroundColor: "#7B339C", // Cor para o dia concluído
  },

  dayLocked: {
    backgroundColor: "#bdbdbd", // Cor para dias bloqueados
  },

  dayNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7B339C",
  },

  progressContainer: {
    position: "absolute",
    bottom: 5,
    height: 6,
    width: 60,
    borderRadius: 3,
    backgroundColor: "#ddd",
    overflow: "hidden",
    flexDirection: "row",
  },

  progressBarRespiracao: {
    height: "100%",
    backgroundColor: "#7B339C",
  },

  progressBarModoFoco: {
    height: "100%",
    backgroundColor: "#a400F0",
  },

  startBalloon: {
    position: "absolute",
    bottom: -40,
    backgroundColor: "#9121C4",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },

  startText: {
    color: "white",
    fontWeight: "bold",
  },

  botoes: {
    height: 60,
    paddingHorizontal: 40,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#d3cce3",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#7B339C",
  },

  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: "#D7BFF7",
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
  },

  modalButtonDisabled: {
    backgroundColor: "#CCC",
  },

  modalCancelButton: {
    marginTop: 10,
  },

  modalInput: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#7B339C",
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 15,
    color: "#7B339C",
    fontWeight: "bold",
  },
});
