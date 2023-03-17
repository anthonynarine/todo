import { Typography, AppBar, Toolbar, Tabs, Tab } from "@mui/material";
import HiveIcon from "@mui/icons-material/Hive";
import { useState } from "react";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";

//array of tabs used in navbar
const navBarTabs = ["Todo", "login", "signup"];

function Header() {
  const [tabNum, setTabNum] = useState();

  const user = null

  return (

      <AppBar position="stick" sx={{ background: "black", padding:"1rem",width: "100%" }}>
        <Toolbar>
          <HiveIcon sx={{color:"#FF3F00",paddingRight: "1rem"}} />
          <Typography> TodoApp</Typography>
          <Tabs
            sx={{ marginLeft: "auto",  }}
            textColor="White"
            value={tabNum}
            onChange={(event, tabNum) => setTabNum(tabNum)}
            indicatorColor="secondary"
          >
{/* Conditionally rendering the login/sign up button if user is not logged in or logout if user is signed in             */}
            <Tab label="Todos" LinkComponent={Link} to="/"></Tab>
            {false ? (<Tab label="Logout" LinkComponent={Link} to="/login">{user}</Tab>) : (
              <>
              <Tab label="login" LinkComponent={Link} to="/login"></Tab>
              <Tab label="sign up" LinkComponent={Link} to="/signup" ></Tab>
              </>
            )}
                
          </Tabs>
        </Toolbar>
      </AppBar>

  );
}
export default Header;
