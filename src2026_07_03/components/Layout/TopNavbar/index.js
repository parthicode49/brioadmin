import * as React from "react";
import { AppBar, Toolbar, IconButton, Stack, Typography } from "@mui/material";
import Profile from "./Profile";
import Tooltip from "@mui/material/Tooltip";
import CurrentDate from "./CurrentDate";
import LightDarkSwitch from "./light_dark_switch";
import Notifications from "./Notifications";
import { Link } from "react-router-dom";
import logo from "./../../../images/logo.png";
const TopNavbar = ({
  toogleActive,
  active,
  darkMode,
  setDarkMode,
  showToolTip,
}) => {
  console.log(darkMode  ,"dsfsdfdssdfs")
  return (
    <>
      <AppBar
        color="inherit"
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0px 4px 20px rgba(47, 143, 232, 0.07)",
          py: "6px",
          mb: "15px",
          position: "sticky",
        }}
        className="top-navbar-for-dark"
      >
        <Toolbar>
          {active && (
            <Link to="/Dashboard" style={{ marginRight: "2rem" }}>
              <img
                src={logo}
                alt="Logo"
                // src={seven_logo} alt="Logo"

                // height={"90rem"}
                width={"110px"}
              />
            </Link>
          )}
          {showToolTip && (
            <Tooltip title="Hide/Show" arrow>
              <IconButton
                size="sm"
                edge="start"
                color="inherit"
                onClick={toogleActive}
              >
                <svg
                  style={{ height: "1rem" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="var(--themeFontColor)"
                    d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                  />
                </svg>
              </IconButton>
            </Tooltip>
          )}

          <Typography component="div" sx={{ flexGrow: 1 }}></Typography>

          <Stack direction="row" spacing={2}>
            <LightDarkSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
            {/* <CurrentDate /> */}

            <Notifications />

            <Profile  darkMode={darkMode} setDarkMode={setDarkMode}/>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopNavbar;
