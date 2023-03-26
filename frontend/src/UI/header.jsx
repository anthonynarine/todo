import {
  Typography,AppBar,Toolbar,Tabs,Tab,Button,} from "@mui/material";
import HiveIcon from "@mui/icons-material/Hive";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//array of tabs used in navbar
const navBarTabs = ["Todo", "login", "signup"];

function Header({ user, logout }) {
  // const [tabNum, setTabNum] = useState();
  // handles inidicator scroll under tabs. CURRENTLY NOT WORKING AS EXPECTED
  // const handleTabChange = (event, tabNum) => {
  //   setTabNum(tabNum);
  // };

  let navigate = useNavigate();

  const headerStyles = {
    condtionbtn: {
      backgroundColor: "#ff3f00",
    },
    Tabs: {
      marginLeft: "auto",
      color: "#060606",
      "&:hover": {
        color: "black",
        backgroundColor: "#D5DDE0",
        borderRadius: "30px",
        // border: "solid #ff3f00",
        borderWidth: "1px",
        borderTopLeftRadius: "5px",
        // borderTopRightRadius: "5%",
        borderBottomRightRadius: "5px",
        borderBottomLefttRadius: "20%",
      },
    },
    btn: {
      color:"#ff3f00",
      borderRadius: 3,
      "&:hover": {
        backgroundColor: "#CAD3D7",
      },
      boxShadow: "2px 0px 0px #CAD3D7 ",
      ":hover":{
        boxShadow:"5px 5px 0px black", 
      }
    },
  };

  return (
    <AppBar
      position="stick"
      sx={{
        background: "#CAD3D7",
        padding: "1rem",
        width: 650,
        margin: "auto",
      }}
    >
      <Toolbar>

{/* Conditionally render add todo button if user is logged in or Todo text if not */}
<HiveIcon sx={{ color: "#FF3F00", paddingRight: "1rem" }} />
        {user ? (
          <Button sx={headerStyles.btn} varient="outlined" onClick={() => navigate("/todos/create")}>
            Add To-do
          </Button>
        ) : (
          <>
            <Typography color="#060606">TodoApp</Typography>
          </>
        )}
        <Tabs
          sx={{ marginLeft: "auto" }}
          textColor="white"
          // value={tabNum}
          // onChange={handleTabChange}
        >
          {/* Conditionally rendering the login/sign up button if user is not logged in or logout if user is signed in */}
          <Tab
            sx={headerStyles.Tabs}
            label="Todos"
            LinkComponent={Link}
            to="/"
          ></Tab>
          {user ? (
            <Tab
              sx={{ color: "#060606" }}
              onClick={logout}
              label={user}
              LinkComponent={Link}
              to="/login"
            ></Tab>
          ) : (
            <div>
              <Tab
                sx={headerStyles.Tabs}
                label="login"
                LinkComponent={Link}
                to="/login"
              ></Tab>
              <Tab
                sx={headerStyles.Tabs}
                label="sign up"
                LinkComponent={Link}
                to="/signup"
              ></Tab>
            </div>
          )}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
