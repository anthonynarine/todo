import TodoDataservice from "./services/axios-requests";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./components/error-page";
import TodoList from "./components/todos-list";
import AddTodo from "./components/add-todo";
import Signup from "./components/signup";
import Login from "./components/login";
// import Footer from "./UI/footer";
import Header from "./UI/header";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  async function login(user = null) {
    TodoDataservice.login(user)
      .then((response) => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", user.username);
        setError("");
        console.log("DATA TEST", response.data, user)
      })
      .catch((error) => {
        console.log("login", error);
      });
  }
  // async function logout(user = null){
  //   setUser(null)
  // };

  // async function singup(user = null){
  //   setUser(null)
  // };

  return (
    <div>
{/* user comes from above async func and is passed a props to header comp (see header for destructure and usage ) */}
      <Header user={user} />
      <Routes>
        {/* we pass in token for the user to authenticate itself */}
        <Route path="/" element={<TodoList token={token} />} />
        <Route path="/todos/create" element={<AddTodo token={token} />} />
        <Route path="/todos/:id" element={<AddTodo token={token} />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
