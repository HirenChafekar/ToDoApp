import "./styles.css";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import { db } from "./firebase_config";
import firebase from "@firebase/app";
import TodoListItem from "./Todo";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []);
  function getTodos() {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress
        }))
      );
    });
  }

  function addTodo(e) {
    e.preventDefault();
    if (todoInput.trim().length !== 0) {
      db.collection("todos").add({
        inprogress: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        todo: todoInput
      });

      setTodoInput("");
    }
  }

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%"
        }}
      >
        <h1>ToDo App</h1>
        <form>
          <TextField
            id="standard-basic"
            label="Write a Todo"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            style={{
              maxWidth: "300px",
              alignItems: "center"
            }}
          />

          <Button
            type="submit"
            variant="contained"
            onClick={addTodo}
            style={{ display: "none" }}
          >
            Default
          </Button>
        </form>

        <div>
          {todos.map((todo) => (
            <TodoListItem
              key={todo.todo}
              todo={todo.todo}
              inprogress={todo.inprogress}
              id={todo.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
