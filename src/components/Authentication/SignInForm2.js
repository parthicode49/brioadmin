// import React, { useMemo } from "react";
// import { Link } from "react-router-dom";
// import Grid from "@mui/material/Grid";
// import {
//   FormControl,
//   FormLabel,
//   Radio,
//   RadioGroup,
//   Switch,
//   Typography,
// } from "@mui/material";
// import { Box } from "@mui/system";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import styles from "./Authentication.module.css";
// // import './Authentication.css'

// import favicon from "./../../images/logo.png";
// import { useState } from "react";
// import IconButton from "@mui/material/IconButton";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { login } from "../../actions/authenticate";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import EmailIcon from "@mui/icons-material/Email";
// import { InputAdornment } from "@mui/material";
// import LoginImg from "../../images/login_bg.jpg";
// import * as Action from "../../actions/authenticate";
// import { bindActionCreators } from "redux";
// import { LOGGEDIN, MESSAGE, PROFILE, ROLE } from "../../constants/actionTypes";

// const SignInForm2 = () => {
//   const dispatch = useDispatch();
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [open, setOpen] = useState(false);
//   const [msg, setMsg] = useState({ msg: "", status: null });
//   const [role, setRole] = useState("admin"); // Default role is admin

//   const handleRoleChange = (event) => {
//     setRole(event.target.value);
//   };
//   const getRoleDisplay = () => {
//     if (role === "admin") return "Admin";
//     if (role === "content owner") return "Content Owner";
//     if (role === "advertiser") return "Advertiser";
//     return "User";
//   };
//   const { login, distributor_login } = bindActionCreators(Action, dispatch);
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     if (role === "admin") {
//       const resData = await login({
//         email: data.get("username"),
//         password: data.get("password"),
//         remember_me: data.get("remember_me"),
//       });
//       console.log(resData, "NewResData Chei123");
//       if (resData?.status === 200) {
//         setMsg({ msg: resData?.data?.message, status: true });
//         setOpen(true);
//         dispatch({ type: PROFILE, payload: resData?.data?.data });
//         dispatch({ type: LOGGEDIN, payload: true });
//         dispatch({ type: ROLE, payload: resData?.data?.data?.role });
//         dispatch({ type: MESSAGE, payload: resData?.data });
//         sessionStorage.setItem(
//           "loggedInDetails",
//           JSON.stringify(resData?.data?.data)
//         );
//         sessionStorage.setItem("remember_me", data.get("remember_me"));
//         sessionStorage.setItem("darkMode", false);
//         sessionStorage.setItem(
//           "loginDetails",
//           JSON.stringify({
//             email: data.get("username"),
//             password: data.get("password"),
//             remember_me: data.get("remember_me"),
//           })
//         );
//         setTimeout(() => {
//           navigate("/Dashboard", { state: { forceShow: true } });
//           setMsg({ msg: "", status: null });
//         }, 2000);
//       } else {
//         setMsg({ msg: resData?.message, status: false });
//         // setTimeout(()=>{
//         // setMsg("")
//         // },2000)
//       }
//     } else if (role === "content owner") {
//       const resData = await distributor_login({
//         email: data.get("username"),
//         password: data.get("password"),
//         remember_me: data.get("remember_me"),
//       });
//       console.log(resData, "NewResData Chei123");
//       if (resData?.status === 200) {
//         setMsg({ msg: resData?.data?.message, status: true });
//         setOpen(true);
//         dispatch({ type: PROFILE, payload: resData?.data?.data });
//         dispatch({ type: LOGGEDIN, payload: true });
//         dispatch({ type: ROLE, payload: resData?.data?.data?.role });
//         dispatch({ type: MESSAGE, payload: resData?.data });
//         sessionStorage.setItem(
//           "loggedInDetails",
//           JSON.stringify(resData?.data?.data)
//         );
//         sessionStorage.setItem("remember_me", data.get("remember_me"));
//         sessionStorage.setItem("darkMode", false);
//         sessionStorage.setItem(
//           "loginDetails",
//           JSON.stringify({
//             email: data.get("username"),
//             password: data.get("password"),
//             remember_me: data.get("remember_me"),
//           })
//         );
//         setTimeout(() => {
//           navigate("/Dashboard", { state: { forceShow: true } });
//           setMsg({ msg: "", status: null });
//         }, 2000);
//       } else {
//         setMsg({ msg: resData?.message, status: false });
//         // setTimeout(()=>{
//         // setMsg("")
//         // },2000)
//       }
//     }

//     // dispatch(
//     //   login(
//     //     {
//     //       email: data.get("username"),
//     //       password: data.get("password"),
//     //       remember_me: data.get("remember_me"),
//     //     },
//     //     navigate
//     //   )
//     // );
//   };
//   const logoutMessage = location.state?.message;

//   useMemo(() => {
//     if (logoutMessage != "" && logoutMessage != undefined) setOpen(true);
//   }, [logoutMessage]);
//   const [passwordType, setPasswordType] = useState("Password");
//   const message = useSelector((state) => state.layout.message);
//   console.log(message, "New Vodep");
//   const handleClose = () => {
//     setOpen(false);
//   };
//   return (
//     <>
//       <Grid
//         container
//         alignItems="center"
//         justifyContent={"center"}
//         sx={{ height: "100vh" }}
//         // key={"container-grid"}
        
//       >
//         <Grid item xs={7} sm={7} md={7.5} lg={8} sx={{ height: "100vh" }}>
//           {/* <div className={styles.newauthenticationBox}> */}
//           {/* <div className={styles.newauthenticationBoxImageDiv}> */}
//           <img src={LoginImg} height={"100%"} width={"100%"} />
//           {/* </div> */}
//         </Grid>
//         <Grid item xs={5} sm={5} md={4.5} lg={4}  >
//           <div className={styles.newauthenticationBoxLoginDiv}>
//           <div className={styles.logoImg}>
//             <img src={favicon} />
//           </div>
//           <div className={styles.loginText}>
//             <span> .</span>
//             <p>Sign in as {getRoleDisplay()}</p>
//           </div>
//           <div className={styles.loginForm}>
//             <form onSubmit={handleSubmit}>
//               <Box>
//                 <Typography
//                   sx={{
//                     fontWeight: "600",
//                     fontSize: "14px",
//                     mb: "6px",
//                     color: "#333 !important ",
//                   }}
//                 >
//                   Login
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   placeholder="Email"
//                   variant="outlined"
//                   required
//                   id="username"
//                   name="username"
//                   InputProps={{
//                     sx: {
//                       borderRadius: 2,
//                       backgroundColor: "#f5f5f5",
//                       "& .MuiOutlinedInput-notchedOutline": {
//                         borderColor: "#f5f5f5  !important",
//                       },
//                     },
//                   }}
//                 />
//               </Box>
//               <Box>
//                 <Typography
//                   sx={{
//                     fontWeight: "600",
//                     fontSize: "14px",
//                     mb: "6px",
//                     mt: "10px",
//                     color: "#333  !important ",
//                   }}
//                 >
//                   Password
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   placeholder="Enter password"
//                   variant="outlined"
//                   name="password"
//                   id="password"
//                   required
//                   type={showPassword ? "text" : "password"}
//                   InputProps={{
//                     sx: {
//                       borderRadius: 2,
//                       backgroundColor: "#f5f5f5",
//                       "& .MuiOutlinedInput-notchedOutline": {
//                         borderColor: "#f5f5f5  !important",
//                       },
//                     },
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           onClick={() => setShowPassword(!showPassword)}
//                           edge="end"
//                         >
//                           {showPassword ? (
//                             <VisibilityOffIcon />
//                           ) : (
//                             <VisibilityIcon />
//                           )}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Box>
//               {/* <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mt: "1rem",
//                   mb: "2rem",
//                 }}
//               >
//                 <FormControlLabel
//                   control={
//                     <Switch size="medium" color="primary" name="remember_me" />
//                   }
//                   label={
//                     <Typography
//                       sx={{ fontSize: "14px", color: "#1A1A1A !important" }}
//                     >
//                       Remember me
//                     </Typography>
//                   }
//                 />

//                 <Link to="/forgotpassword">
//                   <Typography
//                     sx={{
//                       fontSize: "14px",
//                       color: "#FF7827 !important",
//                       textDecoration: "none",
//                     }}
//                   >
//                     Forgot password?
//                   </Typography>
//                 </Link>
//               </Box> */}
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mt: "1rem",
//                   mb: "2rem",
//                   width: "100%",
//                 }}
//               >
//                 <FormControl>
//                   <FormLabel id="role-selection-label">Login As a</FormLabel>
//                   <RadioGroup
//                     row
//                     aria-labelledby="role-selection-label"
//                     name="login-role"
//                     value={role}
//                     onChange={handleRoleChange}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "end",
//                     }}
//                   >
//                     <FormControlLabel
//                       value="admin"
//                       control={<Radio />}
//                       label="Admin"
//                     />
//                     <FormControlLabel
//                       value="content owner"
//                       control={<Radio />}
//                       label="Content Owner"
//                     />
//                     {/* <FormControlLabel
//                       value="advertiser"
//                       control={<Radio />}
//                       label="Advertiser"
//                     /> */}
//                   </RadioGroup>
//                 </FormControl>
//               </Box>
//               <p
//                 style={{
//                   color: msg?.status ? "black" : "red",
//                   marginBottom: "10px",
//                 }}
//               >
//                 {msg?.msg?.length > 0 && msg?.msg}
//               </p>
//               {/* Sign In Button */}
//               <Button
//                 variant="contained"
//                 fullWidth
//                 type="submit"
//                 sx={{
//                   backgroundColor: "#FF7827",
//                   textTransform: "none",
//                   fontWeight: 600,
//                   fontSize: "16px",
//                   py: 1.5,
//                   borderRadius: 2,
//                   ":hover": {
//                     backgroundColor: "#FF7827",
//                   },
//                 }}
//               >
//                 Sign in
//               </Button>
//             </form>
//           </div>
//           </div>
//         </Grid>
//         {/* </div> */}
//       </Grid>
//       <Snackbar
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         open={open}
//         autoHideDuration={3000}
//         onClose={handleClose}
//       >
//         <Alert severity="info" variant="filled" color="success">
//           {msg?.msg || logoutMessage}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default SignInForm2;


import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styles from "./Auth.module.css";
// import './Authentication.css'

import favicon from "./../../images/logo.png";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { login } from "../../actions/authenticate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import EmailIcon from "@mui/icons-material/Email";
import { InputAdornment } from "@mui/material";
import LoginImg from "../../images/login_background.png";
import * as Action from "../../actions/authenticate";
import { bindActionCreators } from "redux";
import { LOGGEDIN, MESSAGE, PROFILE, ROLE } from "../../constants/actionTypes";

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: '#f5f8fa',
  '.Mui-focusVisible &': {
    outline: '2px auto #000',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#000000',
  backgroundImage: 'none',
  '&::before': {
    display: 'none',
  },
  'input:hover ~ &': {
    backgroundColor: '#333',
  },
});

function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

const SignInForm2 = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState({ msg: "", status: null });
  const [role, setRole] = useState("admin"); // Default role is admin

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const getRoleDisplay = () => {
    if (role === "admin") return "Admin";
    if (role === "content owner") return "Content Owner";
    if (role === "advertiser") return "Advertiser";
    return "User";
  };
  const { login, distributor_login } = bindActionCreators(Action, dispatch);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (role === "admin") {
      const resData = await login({
        email: data.get("username"),
        password: data.get("password"),
        remember_me: data.get("remember_me"),
      });
      console.log(resData, "NewResData Chei123");
      if (resData?.status === 200) {
        setMsg({ msg: resData?.message, status: true });
        setOpen(true);
        dispatch({ type: PROFILE, payload: resData?.data?.data });
        dispatch({ type: LOGGEDIN, payload: true });
        dispatch({ type: ROLE, payload: resData?.data?.data?.role });
        dispatch({ type: MESSAGE, payload: resData?.data });
        sessionStorage.setItem(
          "loggedInDetails",
          JSON.stringify(resData?.data?.data)
        );
        sessionStorage.setItem("remember_me", data.get("remember_me"));
        sessionStorage.setItem("darkMode", false);
        sessionStorage.setItem(
          "loginDetails",
          JSON.stringify({
            email: data.get("username"),
            password: data.get("password"),
            remember_me: data.get("remember_me"),
          })
        );
        setTimeout(() => {
          navigate("/Dashboard", { state: { forceShow: true } });
          setMsg({ msg: "", status: null });
        }, 2000);
      } else {
        setMsg({ msg: resData?.message, status: false });
        // setTimeout(()=>{
        // setMsg("")
        // },2000)
      }
    } else if (role === "content owner") {
      const resData = await distributor_login({
        email: data.get("username"),
        password: data.get("password"),
        remember_me: data.get("remember_me"),
      });
      console.log(resData, "NewResData Chei123");
      if (resData?.status === 200) {
        setMsg({ msg: resData?.message, status: true });
        setOpen(true);
        dispatch({ type: PROFILE, payload: resData?.data?.data });
        dispatch({ type: LOGGEDIN, payload: true });
        dispatch({ type: ROLE, payload: resData?.data?.data?.role });
        dispatch({ type: MESSAGE, payload: resData?.data });
        sessionStorage.setItem(
          "loggedInDetails",
          JSON.stringify(resData?.data?.data)
        );
        sessionStorage.setItem("remember_me", data.get("remember_me"));
        sessionStorage.setItem("darkMode", false);
        sessionStorage.setItem(
          "loginDetails",
          JSON.stringify({
            email: data.get("username"),
            password: data.get("password"),
            remember_me: data.get("remember_me"),
          })
        );
        setTimeout(() => {
          navigate("/Dashboard", { state: { forceShow: true } });
          setMsg({ msg: "", status: null });
        }, 2000);
      } else {
        setMsg({ msg: resData?.message, status: false });
        // setTimeout(()=>{
        // setMsg("")
        // },2000)
      }
    }

    // dispatch(
    //   login(
    //     {
    //       email: data.get("username"),
    //       password: data.get("password"),
    //       remember_me: data.get("remember_me"),
    //     },
    //     navigate
    //   )
    // );
  };
  const logoutMessage = location.state?.message;

  useMemo(() => {
    if (logoutMessage != "" && logoutMessage != undefined) setOpen(true);
  }, [logoutMessage]);
  const [passwordType, setPasswordType] = useState("Password");
  const message = useSelector((state) => state.layout.message);
  console.log(message, "New Vodep");
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent={"center"}
        sx={{ height: "100vh", backgroundColor: 'white' }}
      >
        <Grid item xs={7} sm={7} md={7.5} lg={7} xl={8} sx={{ height: "100vh", backgroundColor: 'white', padding: '10px', boxSizing: 'border-box' }}>
          <div className={styles.leftContainer}>
            <div className={styles.leftContainerHeading}>
              <span className={styles.leftContainerHeading} style={{ fontFamily: 'Satoshi, sans-serif !important' }}>Admin Dashboard</span>
              <div className={styles.strikedThrough}></div>
            </div>
            <div className={styles.leftContainerImage}>
              <img src={LoginImg} />
            </div>
            <div className={styles.leftContainerCaption}>
              <span className={styles.CaptionOne} style={{ fontFamily: 'Satoshi, sans-serif' }}>Powerful Tools To Run Your OTT Platform</span>
              <span className={styles.CaptionTwo}>
                <span>
                  Monitor performance, manage content, and streamline your operations
                </span>
                <span>
                  — all in one place.
                </span>
              </span>
            </div>
          </div>
        </Grid>
        <Grid item xs={5} sm={5} md={4.5} lg={5} xl={4}>
          <div className={styles.rightContainer}>
            <div className={styles.logoImg}>
              <img src={favicon} />
            </div>
            <div className={styles.loginText}>
              <span>Welcome Back</span>
              <span>Log in to manage your OTT platform and control your content, users, and insights.</span>
            </div>
            <div className={styles.loginForm}>
              <form onSubmit={handleSubmit}>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "100%",
                      mb: "6px",
                      color: "#333 !important ",
                    }}
                  >
                    Email
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter your email"
                    variant="outlined"
                    required
                    id="username"
                    name="username"
                    InputProps={{
                      sx: {
                        borderRadius: 2,
                        backgroundColor: "#f5f5f5",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#f5f5f5  !important",
                        },
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "14px",
                      mb: "6px",
                      mt: "10px",
                      color: "#333  !important ",
                    }}
                  >
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter your password"
                    variant="outlined"
                    name="password"
                    id="password"
                    required
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      sx: {
                        borderRadius: 2,
                        backgroundColor: "#f5f5f5",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#f5f5f5  !important",
                        },
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: "1rem",
                    mb: "2rem",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox size="medium" color="primary" name="remember_me" />
                    }
                    label={
                      <Typography
                        sx={{ fontSize: "14px", color: "#1A1A1A !important" }}
                      >
                        Remember me
                      </Typography>
                    }
                  />

                  <Link to="/forgotpassword">
                    <Typography
                      sx={{
                        fontSize: "14px",
                        textDecoration: "none",
                      }}
                    >
                      Forgot password?
                    </Typography>
                  </Link>
                </Box>
                <p
                  style={{
                    color: msg?.status ? "black" : "red",
                    marginBottom: "10px",
                  }}
                >
                  {msg?.msg?.length > 0 && msg?.msg}
                </p>
                {/* Sign In Button */}
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    backgroundColor: "#DC5F00",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "16px",
                    py: 1.5,
                    borderRadius: 2,
                    ":hover": {
                      backgroundColor: "#DC5F00",
                    },
                  }}
                >
                  Sign in
                </Button>
                <FormControl sx={{ width: '100%', padding: '20px 30px' }}>
                  <RadioGroup
                    row
                    aria-labelledby="role-selection-label"
                    name="login-role"
                    value={role}
                    onChange={handleRoleChange}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: { lg: 3, xl: 3 },
                    }}
                  >
                    <FormControlLabel sx={{ width: '10rem', display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: '2px', borderColor: '#EDEDED', borderStyle: 'solid', borderRadius: '12px', py: 1 }}
                      value="admin"
                      control={<BpRadio />}
                      label="Admin"
                    />
                    <FormControlLabel sx={{ width: '10rem', display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: '2px', borderColor: '#EDEDED', borderStyle: 'solid', borderRadius: '12px', py: 1 }}
                      value="content owner"
                      control={<BpRadio />}
                      label="Content Owner"
                    />
                  </RadioGroup>
                </FormControl>
              </form>
            </div>
          </div>
        </Grid>
        {/* </div> */}
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity="info" variant="filled" color="success">
          {msg?.msg || logoutMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SignInForm2;