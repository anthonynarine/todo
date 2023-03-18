import { Typography, Grid } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import TodoList from "./components/todos-list";
import AddTodo from "./components/add-todo";
import Signup from "./components/signup";
import Login from "./components/login";
// import Footer from "./UI/footer";
import Header from "./UI/header";
import { useState } from "react";


function App() {

  // const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  // const [error, setError] = useState(null);

  // async function Login(user = null){
  //   setUser(null)
  // };

  // async function Logout(user = null){
  //   setUser(null)
  // };

  // async function Singup(user = null){
  //   setUser(null)
  // };

  return (
    <div >
      <Header />
      <Routes>
{/* if the path is "/" or "/todos" TodoList will be rendered.         */}
{/* we pass in token for the user to authenticate itself */}
        <Route path="/" element={<TodoList token={token} />} />
        <Route path="/todos/create" element={<AddTodo token={token} />} />
        <Route path="/todos/:id" element={<AddTodo token={token} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
