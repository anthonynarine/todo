import {
  Typography,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Button,
  Grid,
} from "@mui/material";
import HiveIcon from "@mui/icons-material/Hive";
import { useState } from "react";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";

//array of tabs used in navbar
const navBarTabs = ["Todo", "login", "signup"];

function Header({ user, logout }) {
  const [tabNum, setTabNum] = useState();
  // handles inidicator scroll under tabs. CURRENTLY NOT WORKING AS EXPECTED
  // const handleTabChange = (event, tabNum) => {
  //   setTabNum(tabNum);
  // };

  const headerStyles = {
    condtionbtn: {
      backgroundColor: "#ff3f00",
    },
    Tabs: {
      marginLeft: "auto",
      color: "#F0F8FB",
      "&:hover": {
        color: "black",
        backgroundColor: "#F0F8FB",
        borderRadius: "30px",
        border: "solid #ff3f00",
        borderWidth: "1px",
        borderTopLeftRadius: "5px",
        // borderTopRightRadius: "5%",
        borderBottomRightRadius: "5px",
        borderBottomLefttRadius: "20%",
      }

    }
  };

  return (
    <AppBar
      position="stick"
      sx={{
        background: "#060606",
        padding: "1rem",
        width: 650,
        margin: "auto",
      }}
    >
      <Toolbar>
        <HiveIcon sx={{ color: "#FF3F00", paddingRight: "1rem" }} />
        <Typography> TodoApp</Typography>
        <Tabs
          sx={{ marginLeft: "auto" }}
          textColor="white"
          // value={tabNum}
          // onChange={handleTabChange}
          >
        {/* Conditionally rendering the login/sign up button if user is not logged in or logout if user is signed in */}
         <Tab sx={headerStyles.Tabs} label="Todos" LinkComponent={Link} to="/"></Tab> 
         {user ? (
            <Tab
              onClick={logout}
              label="Logout"
              LinkComponent={Link}
              to="/login"
            >
            </Tab>
          ) : (
            <div>
              <Tab
                sx={headerStyles.Tabs}
                label="login"
                LinkComponent={Link}
                to="/login"
              ></Tab>
              <Tab sx={headerStyles.Tabs} label="sign up" LinkComponent={Link} to="/signup"></Tab>
            </div> 
          )} 
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
