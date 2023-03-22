import {
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import TodoDataService from "../services/axios-requests";
import { useState, useEffect } from "react";

function TodoList({ token }) {
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
    <Paper
      elevation={24}
      sx={{
        padding: 1,
        width: 390,
        margin: "auto",
        marginTop: 1.5,
        backgroundColor: "#0F0616",
      }}
    >
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
                  <span style={{ fontWeight: "bold" }}>Memo:</span> {todo.memo}
                </Typography>
                <Typography sx={{marginTop:3}} variant="body2" color="text.secondary">
                  <span style={{ fontWeight: "bold" }}>Date Created:</span>{" "}
                  {todo.created}
                </Typography>
              </CardContent>
              <CardActions  sx={{marginTop:-3}}>
                <Button sx={{marginLeft: 10}} size="small">Edit</Button>
                <Button size="small">Delete</Button>
              </CardActions>
            </Card>
          );
        })}
      </Grid>
    </Paper>
  );
}

export default TodoList;
