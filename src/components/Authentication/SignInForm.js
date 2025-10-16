import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styles from "./Authentication.module.css";
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
const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    dispatch(
      login(
        {
          email: data.get("username"),
          password: data.get("password"),
          remember_me: data.get("remember_me"),
        },
        navigate
      )
    );
  };
  const logoutMessage = location.state?.message;

  const [open, setOpen] = useState(false);
  useMemo(() => {
    if (logoutMessage != "" && logoutMessage != undefined) setOpen(true);
  }, [logoutMessage]);
  const [passwordType, setPasswordType] = useState("Password");
  const message = useSelector((state) => state.layout.message);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className={styles.authenticationBox}>
        <Box
          component="main"
          sx={{
            maxWidth: "450px",

            // mr: "10%",
            padding: "20px",
            borderRadius: "10px",
            boxShadow:
              "var(--gradientColor1) -2px -2px 5px 1px,var(--gradientColor1) -2px 2px 5px 1px,var(--gradientColor1) 2px -2px 5px 1px, var(--gradientColor2) 2px 2px 5px 1px, var(--gradientColor2) -2px 2px 5px 1px, var(--gradientColor2) 2px -2px 5px 1px",
            // boxShadow: "#fff -2px -2px 2px 1px,#fff -2px 2px 2px 1px,#fff 2px -2px 2px 1px, #fff 2px 2px 2px 1px, #fff -2px 2px 2px 1px, #fff 2px -2px 2px 1px",

            // boxShadow: "var(--gradientColorLighter2) 0px 6px 5px -2px, var(--gradientColorLighter1) 0px 3px 7px -3px",
          }}
        >
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box>
              {/* <Typography className={styles.text} fontSize="15px" mb="30px">
                Already have an account?{" "}
                <Link
                  to="/Authentication/SignUp"
                  className="primaryColor text-decoration-none"
                >
                  Sign up
                </Link>
              </Typography> */}

              <Box
                component="form"
                sx={{
                  backgroundColor: "rgb(225,225,225,1)",
                  borderRadius: "10px",
                  p: "20px",
                }}
                onSubmit={handleSubmit}
              >
                <Grid container justifyContent={"center"} sx={{ mb: 3 }}>
                  <img
                    src={favicon}
                    alt="favicon"
                    className={styles.favicon}
                    width={"170px"}
                  />
                </Grid>
                <Typography
                  as="h1"
                  fontSize="28px"
                  className={styles.h1}
                  fontWeight="700"
                  mb="5px"
                >
                  <p style={{ textAlign: "center", fontSize: "30px" }}>
                    {" "}
                    Sign In{" "}
                  </p>
                </Typography>
                <Box
                  sx={{
                    padding: "20px 20px",

                    borderRadius: "10px",
                    mb: "20px",
                  }}
                  className="bg-black"
                >
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12}>
                      <Typography
                        component="label"
                        sx={{
                          fontWeight: "500",
                          fontSize: "14px",
                          mb: "10px",
                          display: "block",
                        }}
                      >
                        Email
                      </Typography>

                      <TextField
                        required
                        fullWidth
                        id="username"
                        label="Email"
                        name="username"
                        autoComplete="Email"
                        InputProps={{
                          style: { borderRadius: 8 },
                          endAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon
                                style={{ color: "black !important" }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography
                        component="label"
                        // type={passwordType}
                        sx={{
                          fontWeight: "500",
                          fontSize: "14px",
                          mb: "10px",
                          display: "block",
                        }}
                      >
                        Password
                      </Typography>

                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={passwordType}
                        id="password"
                        autoComplete="new-password"
                        InputProps={{
                          style: { borderRadius: 8 },
                          endAdornment: (
                            <IconButton>
                              {passwordType == "Password" ? (
                                <VisibilityOffIcon
                                  onClick={(e) => {
                                    setPasswordType("Text");
                                  }}
                                />
                              ) : (
                                <VisibilityIcon
                                  onClick={(e) => {
                                    setPasswordType("Password");
                                  }}
                                />
                              )}
                            </IconButton>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={6} sm={6}>
                    <FormControlLabel
                      className={styles.textSize}
                      control={
                        <Checkbox
                          value="true"
                          className={styles.textSize}
                          name="remember_me"
                          style={{
                            fontSize: "14px !important",
                            color: "var(--themeFontColor)",
                          }}
                        />
                      }
                      label={
                        <span
                          className={styles.textSize}
                          style={{
                            fontSize: "14px !important",
                            color: "var(--themeFontColor)",
                          }}
                        >
                          Remember me.
                        </span>
                      }
                    />
                  </Grid>

                  <Grid item xs={6} sm={6} textAlign="end">
                    <Link
                      to="/Authentication/ForgotPassword"
                      className={
                        "primaryColor text-decoration-none " + styles.textSize
                      }
                    >
                      <span style={{ color: "var(--themeFontColor)" }}>
                        Forgot password?
                      </span>
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={12}>
                    <Link
                      to="/Authentication/Register"
                      className={
                        "primaryColor text-decoration-none " + styles.textSize
                      }
                    >
                      <span style={{ color: "var(--themeFontColor)" }}>
                        {" "}
                        Register as a <b>Collaborator</b> / an <b>Advertiser</b>
                      </span>
                    </Link>
                  </Grid>
                </Grid>
                {message?.statuscode !== 200 && message?.message}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    textTransform: "capitalize",
                    borderRadius: "8px",
                    fontWeight: "500",
                    fontSize: "16px",
                    padding: "12px 10px",
                    color: "#fff !important",
                  }}
                  // onClick={()=>navigate("/Dashboard")}
                  style={{
                    background:
                      "linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%)",
                  }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Grid>
        </Box>
      </div>
      <p className={styles.authFooter}>
        Designed and Developed by{" "}
        <a
          href="https://icode49.com/"
          style={{ color: "#e35466", marginLeft: "5px", marginRight: "5px" }}
          target="_blank"
        >
          {" "}
          iCode49 Technolabs.
        </a>{" "}
        All rights reserved 2023
      </p>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity="info" variant="filled" color="success">
          {logoutMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SignInForm;
