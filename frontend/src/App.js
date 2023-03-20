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
        // console.log("TOKEN USER", response.data, user.username)
      })
      .catch((error) => {
        console.log("login", error);
      });
  }
  async function logout(user = null){
    setToken("");
    setUser("");
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
  };

  async function signup(user = null){
    TodoDataservice.signup(user)
    .then(response =>{
        setToken(response.data.token);
        setUser(user.usernaame);
        localStorage.setItem("token", response.data.token);
        localStorage.getItem("user", user.usernaame);
    })
    .catch(error =>{
        console.log(error)
        setError(error.toString());
    })

}

  return (
    <div>
{/* user comes from above async func and is passed a props to header comp (see header for destructure and usage ) */}
      <Header user={user} logout={logout}/>
      <Routes>
        {/* we pass in token for the user to authenticate itself */}
        <Route path="/" element={<TodoList token={token} />} />
        <Route path="/todos/create" element={<AddTodo token={token} />} />
        <Route path="/todos/:id" element={<AddTodo token={token} />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/signup" element={<Signup signup={signup} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
