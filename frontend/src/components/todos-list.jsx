import {
  Typography,Grid,Card,CardContent,CardActions,Button,CardMedia,CardActionArea,Paper} from "@mui/material";
import TodoDataService from "../services/axios-requests";
import { useState, useEffect } from "react";
import fox from "../assets/fox.jpg";
// import asl from "../assets/asl.png"
import { useNavigate } from "react-router-dom";


import moment from "moment"
//the moment library is allows for date format


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
    // backgroundColor: "#060606",
    // width: 100,
    color: 'black',
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 3,
    "&:hover": {
      backgroundColor: "#D5DDE0",
    },
    boxShadow: "2px 0px 0px #ccc",
    ":hover":{
      boxShadow:"5px 5px 0px #D5DDE0", 
    }
  },
  deletebtn: {
    // backgroundColor: "#060606",
    // width: 100,
    color: 'red',
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 3,
    "&:hover": {
      backgroundColor: "#D5DDE0",
    },
    boxShadow: "2px 0px 0px #ccc",
    ":hover":{
      boxShadow:"5px 5px 0px #D5DDE0", 
    }
  },
  paper:{
    margin:"auto",
    width: "75%",
    height: "auto",
    marginTop:3,
    paddingTop: 5,
    paddingBottom: 2.5,
    backgroundColor:"#CAD3D7"
  }
};

function TodoList({ token}) {

  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    retrieveTodos();
  }, [token]);

  const retrieveTodos = () => {
    TodoDataService.getAll(token)
      .then((response) => {
        setTodos(response.data);
        console.log("Data =", response.data);
        console.log("USER MEMO",response.data[0].memo )
        console.log("TOKEN =", token)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    {/* <Paper sx={todoStyles.paper} >  */}
      {token == null || token === "" ? (
        <Card onClick={()=>navigate("/login")} sx={todoStyles.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="190"
              image={fox}
              alt="grey fox"
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
          {/* <Button varient="contained" onClick={()=>navigate("/todos/create")} >Add To-do</Button> */}
          {todos.map((todo) => {
            return (
              <Card
                key={todo.id}
                sx={{
                  maxWidth: 345,
                  backgroundColor: "#E7EFF5",
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
                    {moment(todo.created).format("Do MMMM YYYY")}
                  </Typography>
                </CardContent>
                <CardActions sx={{ marginTop: -3 }}>
                  <Button size="small" variant="text" sx={todoStyles.btn}>
                    Edit
                  </Button>
                  <Button sx={todoStyles.deletebtn} size="small">Delete</Button>
                </CardActions>
              </Card>
            );
          })}
        </Grid>
      )}
       {/* </Paper> */}
    </>

  );
}

export default TodoList;
