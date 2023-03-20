import { Typography, Grid, Paper, Box, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";
import TodoDataService from "../services/axios-requests"
import {useState, useEffect} from "react"

function TodoList({token}) {

  const [todos, setTodos] = useState([]);
  
  useEffect(()=>{
    retrieveTodos();
   
  },[token] );

  const retrieveTodos = ()=> {
    TodoDataService.getAll(token)
    .then(response =>{
      setTodos(response.data);
      console.log("Data", response.data)
    })
    .catch(error =>{
      console.log(error);
    })
  }

  return (
    <Paper>
      <Grid justifyContent="space-evenly" container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}></Grid>
      <Grid item xs={8}>
        {todos.map((todo)=>{
          return(
            <Card sx={{ maxWidth: 345, backgroundColor: "#AEBDC7" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {todo.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <span style={{fontWeight:"bold"}} >Memo:</span> {todo.memo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              <span style={{fontWeight:"bold"}} >Date Created:</span> {todo.created}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Edit</Button>
              <Button size="small">Delete</Button>
            </CardActions>
          </Card>
          )
        })}

    </Grid>

    </Paper>

  );
}

export default TodoList;
