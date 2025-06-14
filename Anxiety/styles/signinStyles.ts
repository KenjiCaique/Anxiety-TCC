import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#7B339C',
    },
    containerHeader:{
      marginTop: '14%',
      marginBottom: '8%',
      paddingStart: '5%',
    },
    message:{
      fontSize: 28,
      fontWeight: 'bold',
      color: '#FFF'
    },
    containerForm:{
      backgroundColor: '#FFF',
      flex: 1,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingStart: '5%',
      paddingEnd: '5%'
    },
    title:{
      fontSize: 20,
      marginTop: 28,
    },
    input:{
      borderBottomWidth: 1,
      height: 50,
      marginBottom: 12,
      fontSize: 16,
    },
    button:{
      backgroundColor: '#7B339C',
      width: '100%',
      borderRadius: 4,
      paddingVertical: 8,
      marginTop: 14,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText:{
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold'
    },
    buttonRegister:{
      padding: 10,
      marginTop: 10,
      alignSelf: 'center'
    },
    titleWithIcon: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconemail:{
      marginTop: 32,
      marginLeft: 5,
    },
    buttonSenha:{
      alignSelf: 'center'
    },
  })