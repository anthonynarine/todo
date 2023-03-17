import { Typography, Grid } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import TodoList from "./components/todos-list";
import AddTodo from "./components/add-todo";
import Signup from "./components/signup";
import Login from "./components/login";
import Header from "./UI/header";
import "./App.css";


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
