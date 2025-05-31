import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // ---------------------- TELA GERAL ----------------------
  container: {
    flex: 1,
    backgroundColor: "#F3F0FF",
  },

  topBar: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  // ---------------------- DIAS ----------------------
  daysContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginHorizontal: 15,
    elevation: 5, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  dayButton: {
    marginHorizontal: 8,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F3F0FF",
    borderRadius: 10,
    minWidth: 50,
    shadowColor: "#7B339C",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },

  dayCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#7B339C",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  dayCompleted: {
    backgroundColor: "#43B77A",
  },

  dayLocked: {
    backgroundColor: "#D3D3D3",
  },

  dayNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },

  dayNumberLocked: {
    color: "#777",
  },

  // ---------------------- PROGRESSO ----------------------
  progressContainer: {
    position: "absolute",
    bottom: -6,
    flexDirection: "row",
    width: 60,
    height: 5,
    backgroundColor: "#E0D8F7",
    borderRadius: 3,
    overflow: "hidden",
  },

  progressBarRespiracao: {
    height: 5,
    backgroundColor: "#00BFFF",
  },

  progressBarModoFoco: {
    height: 5,
    backgroundColor: "#FFA500",
  },

  progressText: {
    fontSize: 12,
    color: "#7B339C",
    marginTop: 6,
    fontWeight: "600",
  },

  // ---------------------- BOTÕES INFERIORES ----------------------
  botoes: {
    position: "absolute",
    bottom: 15,
    left: 20,
    right: 20,
    height: 60,
    borderRadius: 15,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },

  // ---------------------- MODAL ----------------------
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContent: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    width: "100%",
    maxWidth: 350,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#7B339C",
  },

  modalButton: {
    backgroundColor: "#7B339C",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },

  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  modalButtonDisabled: {
    backgroundColor: "#ccc",
  },

  modalCancelButton: {
    marginTop: 15,
    padding: 10,
    alignItems: "center",
  },

  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    marginVertical: 8,
    color: "#000",
  },

  // ---------------------- OUTROS ----------------------
  profile: {
    top: 15,
    left: 10,
    padding: 0,
    margin: 0,
  },
});
