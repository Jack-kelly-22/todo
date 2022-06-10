import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyValuePair } from "@react-native-async-storage/async-storage/lib/typescript/types";
import { Todo } from "./types";

// Remove all todos from storage
export const clearTodos = async () => {
  try {
    await AsyncStorage.clear();
    console.log("cleared todos");
  } catch (e) {
    // saving error, log result
    console.log("error clearing todos: ", e);
  }
};

// Fetch all todos from storage, if none exist, return empty array
export const loadTodos = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    console.log("keys: ", keys);

    if (keys.values() !== null) {
      const todos = (await AsyncStorage.multiGet(keys)).map(
        (item)=> JSON.parse(item[1])
      );
      // sort todos by id
      todos.sort((a, b) => b.id - a.id);
      console.log("loaded todos: ", todos);
      return todos;
    }
    return [];
  } catch (e) {
    // error reading value
    console.log("error reading todos: ", e);
  }
};

// Save todos to storage
export const storeTodo = async (todo: Todo) => {
  try {
    const jsonValue = JSON.stringify(todo);
    await AsyncStorage.setItem(`todos-${todo.id}`, jsonValue);
    console.log("saved todo: ", jsonValue);
  } catch (e) {
    // saving error
    console.log("error saving todos: ", e);
  }
};
