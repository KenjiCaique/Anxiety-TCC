import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F0FF",
  },

  topBar: {
    height: 60,
    backgroundColor: "#7B339C",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 15,
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
});
