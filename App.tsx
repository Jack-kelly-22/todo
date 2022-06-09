import { StatusBar } from 'expo-status-bar';
import { styles } from './styles';
import {Text, View } from 'react-native';
import { Modal, TextInput, Button, FlatList,Pressable,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { clearTodos,storeTodos, loadTodos } from './storageManager';
import { Todo } from './types';


const Task = ({text,id}:Todo) => (
  <View style={styles.todo}>
    <Text>{text}</Text>
    <Text>id:{id}</Text>
  </View>
);

export default function App() {

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [description, setDescription] = useState('');
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(true);

  
  // Attempt to load todos from storage
  useEffect(() => {
    reload()
  }, []);
  
  const updateTodos = (todo:Todo) => {
    setTodos([todo,...todos]);
    storeTodos([todo,...todos]);
  }

  const reload = async () => {
    setLoading(true);
    const todos = await loadTodos();
    setTodos(todos);
    setId(todos.length);
  }
  
  return (
    <View style={styles.container}>
      <Button title="Add Todo"  onPress={() => setModalVisible(true)} />
      {/* Scrollable flatlist to show Todo items */}
      <FlatList<Todo>
       data={todos}
       renderItem={({ item }) => <Task {...item} />}
      //  onRefresh={reload}
      // extraData={todos}
      // loading={loading}

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

