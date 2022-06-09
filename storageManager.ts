import AsyncStorage from "@react-native-async-storage/async-storage";
type Todo = {
  id: number;
  text: string;
};

export const clearTodos = async () => {
  try {
    await AsyncStorage.removeItem("todos");
    console.log("cleared todos");
  } catch (e) {
    // saving error
    console.log("error clearing todos: ", e);
  }
};

export const loadTodos = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("todos");

    if (jsonValue !== null) {
      console.log("loaded todos: ", jsonValue);
      return JSON.parse(jsonValue);
    }
    return [];
  } catch (e) {
    // error reading value
    console.log("error reading todos: ", e);
  }
};

export const storeTodos = async (todos: Todo[]) => {
  try {
    const jsonValue = JSON.stringify(todos);
    await AsyncStorage.setItem("todos", jsonValue);
    console.log("saved updated todos: ", jsonValue);
  } catch (e) {
    // saving error
    console.log("error saving todos: ", e);
  }
};
