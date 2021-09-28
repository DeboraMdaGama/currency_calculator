import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems: 'center',
      backgroundColor: '#101215',
      paddingTop: 40
    },
    areaMoeda:{
      width: '90%',
      backgroundColor: '#F9f9f9',
      paddingTop: 9,
      borderTopLeftRadius: 9,
      borderTopRightRadius: 9,
      marginBottom: 1,
    },
    titulo:{
      fontSize: 15,
      color: '#000',
      paddingTop: 5,
      paddingLeft: 5,
    },
    areaValor:{
      width: '90%',
      backgroundColor: '#F9f9f9',
      paddingBottom: 9,
      paddingTop: 9
    },
    input:{
      width: '100%',
      padding: 10,
      height: 45,
      fontSize: 20,
      marginTop: 8,
      color: '#000'
    },
    botaoArea:{
     width: '90%',
     backgroundColor: '#FB4b57',
     height: 45 ,
     borderBottomLeftRadius: 9,
     borderBottomRightRadius: 9,
     justifyContent: 'center',
     alignItems: 'center'
    },
    botaoTexto:{
      fontSize: 18,
      color:'#FFF',
      fontWeight: 'bold'
    },
    areaResultado:{
      width: '90%',
      backgroundColor:'#FFF',
      marginTop: 35,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 25
    },
    valorConvertido:{
      fontSize: 39,
      fontWeight: 'bold',
      color: '#000'
    }
  });  