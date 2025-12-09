import * as React from "react";
import {
  MESSAGE,
  PROFILE,
  ADVERTISER,
  DISTRIBUTOR,
  RIGHTS,
  ROLE,
  LOGGEDIN,
} from "../../../constants/actionTypes";
import {
  IconButton,
  Typography,
  Box,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import profile_pic from "./../../../images/profile_pic.png";
import { useNavigate } from "react-router-dom";
import { IMAGE } from "../../../api";
import { useSelector, useDispatch } from "react-redux";
const Profile = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = useSelector((state) => state.layout.profile);
  const role = useSelector((state) => state.layout.role);
  const advertiser = useSelector((state) => state.layout.advertiser);
  const distributor = useSelector((state) => state.layout.distributor);

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ p: 0 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          className="ml-2"
        >
          <Avatar
            src={
              (role == "Advertiser" && IMAGE + advertiser?.company_logo) ||
              (role == "Producer" && IMAGE + distributor?.company_logo) ||
              profile_pic
            }
            alt="Adison Jeck"
            sx={{ width: 40, height: 40 }}
          />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: "10px",
            border: "2px solid var(--themeFontColor)",
            boxShadow: "0px 10px 35px rgba(50, 110, 189, 0.2)",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            bgcolor: "var(--themeColor)",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "var(--themeFontColor)",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        className="for-dark-top-navList"
      >
        <MenuItem>
          <Avatar
            src={
              (role == "Advertiser" && IMAGE + advertiser?.company_logo) ||
              (role == "Producer" && IMAGE + distributor?.company_logo) ||
              profile_pic
            }
            className="mr-1"
          />
          <Box>
            <Typography
              sx={{ fontSize: "11px", color: "var(--themeFontColor)" }}
            >
              <span style={{ color: "var(--themeFontColor)" }}> {role}</span>
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                color: "var(--themeFontColor)",
                fontWeight: "500",
              }}
            >
              <span style={{ color: "var(--themeFontColor)" }}>
                {user?.firstName}
              </span>
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                color: "#260944",
                fontWeight: "500",
              }}
            >
              <span style={{ color: "var(--themeFontColor)" }}>
                {user?.email}
              </span>
            </Typography>
          </Box>
        </MenuItem>

        {/* <Divider sx={{ borderColor: "var(--themeFontColor)" }} /> */}

        {/* {(role == "Advertiser" ||
          role == "Producer" ||
          role == "Distributor") && (
          <MenuItem>
            <ListItemIcon sx={{ mr: "-8px", mt: "-3px" }}>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <Link
              to="/Dashboard/Profile/"
              fontSize="13px"
              color="var(--themeFontColor)"
            >
              Profile
            </Link>
          </MenuItem>
        )} */}
        {/* {(role=="Advertiser"||role=="Producer" )&&  <MenuItem>
          <ListItemIcon sx={{ mr: "-8px", mt: "-3px" }}>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <Link
            to="/BankDetails/BankDetails/"
            fontSize="13px"
            color="var(--themeFontColor)"
          >
            Bank Details
          </Link>
        </MenuItem>
}
         */}

        {/* <MenuItem>
          <ListItemIcon sx={{ mr: "-8px", mt: "-3px" }}>
            <Settings fontSize="small" />
          </ListItemIcon>
          <Link
            to="/Authentication/ChangePassword/"
            fontSize="13px"
            color="var(--themeFontColor)"
            underline="none"
          >
            Change Password
          </Link>
        </MenuItem> */}

        <Divider sx={{ borderColor: "var(--themeFontColor)" }} />

        <MenuItem
          onClick={() => {
            sessionStorage.setItem("remember_me", "false");
            sessionStorage.setItem("loginDetails", null);
            sessionStorage.setItem("loggedInDetails", null);
            // sessionStorage.setItem(null)
            if(role == "Admin" ){
            setTimeout(()=>{
              navigate("/", { state: { message: "Logged Out Successfully" } });
            },100)
          }else{
              setTimeout(()=>{
                navigate("/login", { state: { message: "Logged Out Successfully" } });
              },100)

            }
            dispatch({ type: PROFILE, payload: {} });
            dispatch({ type: ADVERTISER, payload: {} });
            dispatch({ type: DISTRIBUTOR, payload: {} });
            dispatch({ type: RIGHTS, payload: {} });
            dispatch({ type: ROLE, payload: "" });
            dispatch({ type: LOGGEDIN, payload: false });
            props?.setDarkMode(false)
          }}
        >
          <ListItemIcon sx={{ mr: "-8px", mt: "-3px" }}>
            <Logout fontSize="small" />
          </ListItemIcon>

          <p fontSize="13px" color="var(--themeFontColor)" underline="none">
            Logout
          </p>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
