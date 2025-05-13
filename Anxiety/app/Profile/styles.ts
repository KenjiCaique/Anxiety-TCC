import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    profileContainer: {
      alignItems: 'center',
      marginBottom: 30,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    userName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
    },
    aboutContainer: {
      marginBottom: 30,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    aboutTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#7B339C',
      marginBottom: 10,
    },
    aboutText: {
      fontSize: 16,
      textAlign: 'center',
      color: '#666',
    },
    logoutButton: {
      backgroundColor: '#7B339C',
      paddingVertical: 12,
      paddingHorizontal: 40,
      borderRadius: 8,
      marginTop: 20,
    },
    logoutButtonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });