import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
      // flex: 1,
      marginTop: 40,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    todo: {
      padding: 20,
      height: 50,
      textAlign: 'center',
      flexDirection: 'row',
      marginVertical: 10,
      backgroundColor: '#ccc',
      justify: 'between'
    },
    todoList: {
      height: '40%'
  
    },
  
    button:{
      borderRadius: 30,
    },
  
    centeredView: {
      // flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowRadius: 4,
      elevation: 5
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 2,
      borderColor: '#ccc',
      borderRadius: 10,
      padding: 10,
    },
  
  });