import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    height: "80%",
  },

  todo: {
    padding: 20,
    height: 60,
    width:200,
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: "#ccc",
  },

  button: {
    borderRadius: 30,
    padding: 10,
    backgroundColor: "green",
    textColor: "white",
  },


  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
  },
});
