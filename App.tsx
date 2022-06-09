import { StatusBar } from 'expo-status-bar';
import { Modal, Text, View, TextInput, Button, FlatList, Pressable, Alert, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { Todo } from './types';
import { styles } from './styles';
import { clearTodos, storeTodos, loadTodos } from './storageManager';

// Task component renders a single todo item
const Task = ({ text, id }: Todo) => (
  <View style={styles.todo}>
    <Text>{text}</Text>
  </View>
);

// Main component for todo app
export default function App() {

  const [modalVisible, setModalVisible] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(true);

  // reload todos from storage
  const reload = async () => {
    console.log('Start reload');
    setLoading(true);
    const todos = await loadTodos();
    setTodos(todos);
    setId(todos.length);
    setLoading(false);
    console.log('reloaded');
  }

  // Attempt to load todos from storage on mount
  useEffect(() => {
    reload()
  }, []);



  // Component holding all todo items
  function TodoList() {
    return (
      <FlatList<Todo>
        data={todos}
        renderItem={({ item }) => <Task {...item} />}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={reload} />}
        keyExtractor={({ id }) => id.toString()}
      />
    )
  }

  // Modal for adding a new todo
  function AddTodoModal() {
    const [description, setDescription] = useState('');
    const [empty, setEmpty] = useState(false);

    // update todos in state and storage 
    const updateTodos = (todo: Todo) => {
      setTodos([todo, ...todos]);
      storeTodos([todo, ...todos]);
    }
    // Add a new todo to the list and inc id
    const addTodo = () => {
      if (description.length > 0) {
        setModalVisible(!modalVisible);
        updateTodos({ id: id, text: description });
        setDescription('');
        setId(id + 1);
      }
      else {
        setEmpty(true);
      }
    }
    return (<Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text> New Todo Item </Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setDescription(text)}
            value={description}
            placeholder="Enter Todo description"
          />
          <Pressable style={styles.button} onPress={() => addTodo()} >
            <Text>Add Todo</Text>
          </Pressable>
          {/* show error if empty string */}
          {empty && <Text>Description cannot be empty</Text>}
        </View>
      </View>
    </Modal>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
        <Text>Add Todo</Text>
      </Pressable>
      {/* Scrollable flatlist to show Todo items */}
      <TodoList />
      <Pressable style={styles.button} onPress={() => {
        clearTodos()
        reload()
      }}>
        <Text>Clear Todos</Text>
      </Pressable>
      <AddTodoModal />
      <StatusBar style="auto" />
    </View>
  );
}

