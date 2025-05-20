import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  circleWrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  textWrapper: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 32,
    fontWeight: "700",
  },
  countdownWrapper: {
    position: "absolute",
    bottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  countdownText: {
    fontSize: 48,
    fontWeight: "900",
    color: "#333",
  },
  motivationalText: {
    marginTop: 30,
    fontSize: 18,
    color: "#555",
    fontStyle: "italic",
  },
  button: {
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#6200ee",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
