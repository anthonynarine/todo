import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const loginStyles = {
  box: {
    border: "solid #111810",
    maxWidth: "30%",
    margin: "auto",
    marginTop: 5,
    padding: 2,
    borderRadius: 5,
    boxShadow: "5px 5px 10px #ccc",
    ":hover": {
      boxShadow: "10px 10px 20px #111810",
    },
  },
  btn: {
    backgroundColor: "#FF3F00",
    marginTop: 3,
    borderRadius: 3,
    "&:hover": {
      backgroundColor: "#111810",
    },
  },
};

function Login({ login }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const signIn = () => {
    login({ username: username, password: password });
    navigate("/");
  };

  return (
    <form>
      <Box
        sx={loginStyles.box}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" padding={3} textAlign="center">
          Login
        </Typography>
        <TextField
          onChange={handleUsernameChange}
          margin="normal"
          type={"text"}
          value={username}
          variant="outlined"
          placeholder="Enter username"
        />
        <TextField
          onChange={handlePasswordChange}
          margin="normal"
          type={"password"}
          value={password}
          variant="outlined"
          placeholder="Enter password"
        />
        <Button
          onClick={signIn}
          sx={loginStyles.btn}
          size="large"
          variant="contained"
        >
          Login
        </Button>
      </Box>
    </form>
  );
}
export default Login;
