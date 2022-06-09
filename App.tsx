import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Modal, TextInput, Button, FlatList,Pressable,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

const temp_todos = [
  {
    id: 100,
    text: 'Learn React Native',
  },
];

type Todo = {
  id: number;
  text: string;
};

const Task = ({text,id}:Todo) => (
  <View style={styles.todo}>
    <Text>{text}</Text>
    <Text>{id}</Text>
  </View>
);

const storeTodos = async (todos:Todo[]) => {
  try {
    const jsonValue = JSON.stringify(todos)
    await AsyncStorage.setItem("todos", jsonValue)
    console.log("saved updated todos: ", jsonValue)
  } catch (e) {
    // saving error
    console.log("error saving todos: ", e)
  }
}

const clearTodos = async () => {
  try {
    await AsyncStorage.removeItem("todos")
    console.log("cleared todos")
  } catch (e) {
    // saving error
    console.log("error clearing todos: ", e)
  }
}

const loadTodos = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("todos")
    
    if (jsonValue !== null) {
      console.log("loaded todos: ", jsonValue)
      return JSON.parse(jsonValue)
    }
    return []
  } catch (e) {
    // error reading value
    console.log("error reading todos: ", e)
  }
}


export default function App() {

  const [modalVisible, setModalVisible] = useState(false);
  const [todos, setTodos] = useState(temp_todos);
  const [description, setDescription] = useState('');
  const [id, setId] = useState(0);

  
  // Attempt to load todos from storage
  // useEffect(() => {
  //   reload()
  // }, [todos]);
  
  const updateTodos = (todo:Todo) => {
    setTodos([todo,...todos]);
    storeTodos([todo,...todos]);
  }
  
  return (
    <View style={styles.container}>
      <Button title="Add Todo"  onPress={() => setModalVisible(true)} />
      <FlatList<Todo>
       data={todos}
       renderItem={({ item }) => <Task {...item} />}
      //  onRefresh={()=>reload}

       keyExtractor={({id}) => id.toString()}
        />

      <Button title="Clear Todos" onPress={() => clearTodos()} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text> New Todo Item </Text>
          <TextInput
        style={styles.input}
        onChangeText={(text) => setDescription(text)}
        value={description}
        placeholder="Enter Todo description"
      />
            <Button title="Add" onPress={() => {
              setModalVisible(!modalVisible);
              updateTodos({id:id,text:description});
              setDescription('');
              setId(id+1);
            }} />
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  todo: {
    padding: 10,
    height: 80,
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: '#ccc',
  },
  todoList: {
    height: '80%'
  },

  centeredView: {
    flex: 1,
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