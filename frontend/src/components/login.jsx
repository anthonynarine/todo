import { Box, Typography, TextField, Button, Paper, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const loginStyles = {
  box: {
    // border: "solid #111810",
    maxWidth: 500,
    margin: "auto",
    marginTop: 5,
    padding: 2,
    paddingBottond: 5,
    backgroundColor: "#DDDDE5",
    // borderRadius: 5,
    boxShadow: "5px 5px 10px #ccc",
    ":hover": {
      boxShadow: "10px 10px 20px #060606",
    },
  },
  btn: {
    backgroundColor: "#060606",
    width: 300,
    marginTop: 3,
    marginBottom:3,
    borderRadius: 3,
    "&:hover": {
      backgroundColor: "#FF3F00",
    },
    paper: {
      width: 300, 
    }
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
      <Grid item container justifyContent="center">
        <Grid item>
      <Paper sx={{width:500}} elevation={24}>
      <Box
        sx={loginStyles.box}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent="center"
      >
        <Typography color="#060606" variant="h4" padding={3} textAlign="center">
          Login
        </Typography>
        <TextField
          sx={{width: 300 }}
          color="warning"
          onChange={handleUsernameChange}
          margin="normal"
          type={"text"}
          value={username}
          variant="outlined"
          placeholder="Enter username *"
          />
        <TextField
          color="warning"
        sx={{width: 300}}
          onChange={handlePasswordChange}
          margin="normal"
          type={"password"}
          value={password}
          variant="outlined"
          placeholder="Enter password *"
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
      </Paper>
      </Grid>
      </Grid>
    </form>
  );
}
export default Login;
