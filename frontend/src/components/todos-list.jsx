import {
  Typography,
  Grid,

  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import TodoDataService from "../services/axios-requests";
import { useState, useEffect } from "react";
import fox from "../assets/fox.jpg";
import { useNavigate } from "react-router-dom";


const todoStyles = {
  card: {
    maxWidth: 500,
    margin: "auto",
    marginTop: 10,
    // padding: 2,
    borderRadius: 0,
    boxShadow: "5px 5px 10px #ccc",
    ":hover": {
      boxShadow: "10px 10px 20px #060606",
    },
  },
  btn: {
    backgroundColor: "#060606",
    width: 100,
    marginTop: 5,
    borderRadius: 3,
    "&:hover": {
      backgroundColor: "#FF3F00",
    },
  },
};

function TodoList({ token }) {

  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    retrieveTodos();
  }, [token]);

  const retrieveTodos = () => {
    TodoDataService.getAll(token)
      .then((response) => {
        setTodos(response.data);
        console.log("Data", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {token == null || token === "" ? (
        <Card onClick={()=>navigate("/login")} sx={todoStyles.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="190"
              image={fox}
              alt="green iguana"
            />
            <CardContent>
              <Typography  gutterBottom variant="h5" component="div">
                Welcome
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Plese
                <span
                  onClick={() => navigate("/login")}
                  style={{ cursor: "pointer", color: "#FF3F00" }}
                >
                  {" "}
                  Login
                </span> to view and make changes to your todos
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ) : (
        <Grid item xs={8}>
          {todos.map((todo) => {
            return (
              <Card
                sx={{
                  maxWidth: 345,
                  backgroundColor: "white",
                  margin: "auto",
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {todo.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <span style={{ fontWeight: "bold" }}>Memo:</span>{" "}
                    {todo.memo}
                  </Typography>
                  <Typography
                    sx={{ marginTop: 3 }}
                    variant="body2"
                    color="text.secondary"
                  >
                    <span style={{ fontWeight: "bold" }}>Date Created:</span>{" "}
                    {todo.created}
                  </Typography>
                </CardContent>
                <CardActions sx={{ marginTop: -3 }}>
                  <Button sx={{ marginLeft: 10 }} size="small">
                    Edit
                  </Button>
                  <Button size="small">Delete</Button>
                </CardActions>
              </Card>
            );
          })}
        </Grid>
      )}
    </>
  );
}

export default TodoList;
