import { Typography, Grid, Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Stack } from "@mui/system";

const signupStyles = {
  box: {
    // border: "solid #111810",
    maxWidth: 500,
    margin: "auto",
    marginTop: 5,
    padding: 2,
    backgroundColor: "#CAD3D7",
    // borderRadius: 5,
    boxShadow: "5px 5px 10px #ccc",
    ":hover": {
      boxShadow: "10px 10px 20px #060606",
    },
  },
  btn: {
    backgroundColor: "#060606",
    width: 300,
    marginTop: 1.5,
    borderRadius: 3,
    "&:hover": {
      backgroundColor: "#FF3F00",
    },
  },
  btn1: {
    backgroundColor: "#D9DADB",
    width: 300,
    marginTop: 1.5,
    marginBottom: 1.5,
    borderRadius: 3,
    "&:hover": {
      backgroundColor: "white",
    },
  },
};

function Signup({ signup }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const signupNewUser = () => {
    signup({ username: username, password: password });
    navigate("/login");
  };

  return (
    <Box sx={signupStyles.box}>
      <form>
        <Typography color="#060606" variant="h4" padding={3} textAlign="center">
          Sign up
        </Typography>
        <Grid
          item
          container
          rowSpacing={1}
          justifyContent="center"
          //   sx={{ border: "solid" }}
        >
          <Grid item container justifyContent="center">
            <Grid item>
              <TextField
                sx={{ width: 300 }}
                color="warning"
                onChange={handleUsernameChange}
                margin="normal"
                type={"text"}
                value={username}
                variant="outlined"
                placeholder="Enter username *"
              />
              <Grid item>
                <TextField
                  sx={{ width: 300 }}
                  color="warning"
                  onChange={handlePasswordChange}
                  margin="normal"
                  type={"text"}
                  value={password}
                  variant="outlined"
                  placeholder="Enter Password *"
                />
              </Grid>
            </Grid>
            <Grid item justifyContent="center" container>
              <Stack>
                <Button
                  onClick={signupNewUser}
                  sx={signupStyles.btn}
                  size="large"
                  variant="contained"
                >
                  Sign up
                </Button>
                <Button
                  onClick={() => navigate("/login")}
                  sx={signupStyles.btn1}
                  size="large"
                  Type="error"
                  variant="small"
                >
                  <Typography variant="caption">
                    Already have an account?...
                    <span
                      onClick={() => navigate("/login")}
                      style={{ cursor: "pointer", color: "#FF3F00" }}
                    >
                      login
                    </span>
                  </Typography>
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default Signup;
