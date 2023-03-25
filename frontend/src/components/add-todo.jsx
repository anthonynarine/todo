import { Typography, Grid,TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoDataService from "../services/axios-requests";

function AddTodo({ token, user }) {
  let navigate = useNavigate();

// when this is switched to true we will be in edit mode. Fasle means we are adding a todo
  let editing = false; 
  let initialTodoTitle = "";
  let initialTodoMemo = "";

  const [title, setTitle] = useState(initialTodoTitle);
  const [memo, setMemo] = useState(initialTodoMemo);
  const [submitted, setSubmitted] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMemoChange = (event) => {
    setMemo(event.target.value);
  };

  const saveTodo = () => {
    var data = {  
      title,
      memo,
      completed: false,
    };
    TodoDataService.createTodo(data, token)
      .then((response) => {
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error, user);
      });
  };

  return (
    <Grid container justifyContent="center" sx={{ border: "solid black" }}>
      {submitted ? (
        <Grid item>
          <Typography varient="h4">Todo submitted successfully</Typography>
          <Typography onClick={() => navigate("/todos")}>
            Back to todos
          </Typography>
        </Grid>
      ) : (
        <form>
          <Grid item>
            <TextField
              sx={{ width: 300 }}
              id="title"
              color="warning"
              onChange={handleTitleChange}
              margin="normal"
              type={"text"}
              value={title}
              variant="outlined"
              placeholder="Title *"
            />
          </Grid>
          <Grid item>
            <TextField
              id="memo"
              label="Memo"
              variant="outlined"
              multiline
              rows={3}
              placeholder="Memo"
              value={memo}
              onChange={handleMemoChange}
            />
          </Grid>
          <Grid item>
            <Button varient="contained" onClick={saveTodo}>
                {editing ? "Edit" : "Add"} to-do
            </Button>
          </Grid>
        </form>
      )}
      token = {token}-- user =
      {user}
    </Grid>
  );
}

export default AddTodo;
