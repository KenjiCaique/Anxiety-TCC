import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#320339",
    padding: 24,
  },

  calendar: {
    backgroundColor: "transparent",
  },

  calendarHeader: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#e8e8e8",
    paddingBottom: 10,
    marginBottom: 10,
  },

  annotationContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
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
    justifyContent: "space-between",
    marginTop: 20,
  },

  saveButton: {
    backgroundColor: "green",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#aa0000",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontWeight: "bold",
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
});
