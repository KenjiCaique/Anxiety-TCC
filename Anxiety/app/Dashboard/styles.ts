import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5e5ff",
  },

  topBar: {
    height: 60,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "#7B339C",
  },

  dayCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#D7BFF7",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#7B339C",
  },

  dayCompleted: {
    backgroundColor: "#7B339C",
  },

  dayLocked: {
    backgroundColor: "#bdbdbd",
  },

  dayNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7B339C",
  },

  dayNumberLocked: {
    color: "#7B339C",
    opacity: 0.5,
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
    backgroundColor: "#5E2D82",
  },

  startBalloon: {
    position: "absolute",
    bottom: -40,
    backgroundColor: "#7B339C",
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
    backgroundColor: "#f5e5ff",
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