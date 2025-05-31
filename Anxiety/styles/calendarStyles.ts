import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  calendar: {
    backgroundColor: "transparent",
    marginTop: 80,
  },

  calendarHeader: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#e8e8e8",
    paddingBottom: 10,
    marginBottom: 10,
  },

  annotationContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "#26152b",
    paddingVertical: 12,
    borderRadius: 10,
  },

  annotationTitle: {
    color: "#e8e8e8",
    fontWeight: "bold",
    marginBottom: 4,
  },

  annotationText: {
    color: "#e8e8e8",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },

  modalContainer: {
    backgroundColor: "#3E2E45",
    padding: 25,
    borderRadius: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },

  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  moodOption: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    textAlign: "center",
  },

  inputLabel: {
    color: "#e8e8e8",
    marginTop: 20,
    marginBottom: 6,
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
  },

  saveButton: {
    backgroundColor: "#32CD32",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#C94C4C",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
  },

  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  pageTitle: {
    color: "#e8e8e8",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 70,
    marginBottom: 20,
  },
  actionBox: {
    backgroundColor: "#32CD32",
    width: "45%",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: "column",
  },
  buttonLabel: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 4,
  },
  titleH1: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#e8e8e8",
    textAlign: "center",
    marginBottom: 6,
  },

  titleH2: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ccc",
    textAlign: "center",
  },

  buttonBox: {
  borderRadius: 12,
  paddingVertical: 12,
  paddingHorizontal: 20,
  alignItems: "center",
  marginTop: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 5,
},

buttonText: {
  color: "#000",
  fontSize: 16,
  fontWeight: "bold",
},
});
