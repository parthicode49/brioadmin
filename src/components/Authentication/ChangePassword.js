import React, { useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styles from "./Authentication.module.css";
import './Authentication.css'

import favicon from "./../../images/logo.png"
import IconButton from '@mui/material/IconButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { change_password } from "../../actions/authenticate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom"
const ChangePassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.layout.profile)
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
console.log({
  email: "cherilgandhi@gmail.com",
  old_password: data.get("old_password"),
  new_password: data.get("new_password"),
},"testing")
    dispatch(change_password({
      email: user?.email,
      // email : "cherilgandhi@gmail.com",
      old_password: data.get("old_password"),
      new_password: data.get("new_password"),
    }, navigate))
  };
  const [form, setForm] = useState({})
  const [oldPasswordType, setOldPasswordType] = useState("Password")
  const [newPasswordType, setNewPasswordType] = useState("Password")
  const [confirmPasswordType, setConfirmPasswordType] = useState("Password")
  const message = useSelector((state) => state.layout.message);


  return (
    <>

      <div className={styles.authenticationBox} >
        <Box
          component="main"
          sx={{
            maxWidth: "450px",

            // mr: "10%",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "var(--gradientColor1) -2px -2px 5px 1px,var(--gradientColor1) -2px 2px 5px 1px,var(--gradientColor1) 2px -2px 5px 1px, var(--gradientColor2) 2px 2px 5px 1px, var(--gradientColor2) -2px 2px 5px 1px, var(--gradientColor2) 2px -2px 5px 1px",
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



              <Box component="form" sx={{ backgroundColor: "rgb(225,225,225,1)", borderRadius: "10px", p: "20px" }} onSubmit={handleSubmit}>
                <Grid container justifyContent={"center"} sx={{ mb: 3 }}>
                  <img
                    src={favicon}
                    alt="favicon"
                    className={styles.favicon}
                    width={"170px"}
                  /></Grid>
                <Typography as="h1" fontSize="28px" className={styles.h1} fontWeight="700" mb="5px">
                  Change Password{" "}

                </Typography>
                <Box
                  sx={{
                    padding: "30px 20px",

                    borderRadius: "10px",
                    mb: "20px",
                  }}
                  className="bg-black"
                >
                  <Grid container alignItems="center" spacing={2}>


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
                        Old Password
                      </Typography>

                      <TextField

                        required
                        fullWidth
                        name="old_password"
                        label="Old Password"
                        type={oldPasswordType}
                        id="old_password"
                        autoComplete="old-password"
                        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                        InputProps={{
                          style: { borderRadius: 8 },
                          endAdornment: (

                            <IconButton  >
                              {oldPasswordType == "Password" ? <VisibilityOffIcon onClick={(e) => {
                                setOldPasswordType("Text")
                              }} />
                                :
                                <VisibilityIcon onClick={(e) => {
                                  setOldPasswordType("Password")
                                }} />

                              }
                            </IconButton>
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
                        New Password
                      </Typography>

                      <TextField

                        required
                        fullWidth
                        name="new_password"
                        label="New Password"
                        type={newPasswordType}
                        id="new_password"
                        autoComplete="new-password"
                        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                        InputProps={{
                          style: { borderRadius: 8 },
                          endAdornment: (

                            <IconButton  >
                              {newPasswordType == "Password" ? <VisibilityOffIcon onClick={(e) => {
                                setNewPasswordType("Text")
                              }} />
                                :
                                <VisibilityIcon onClick={(e) => {
                                  setNewPasswordType("Password")
                                }} />

                              }
                            </IconButton>
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
                        Confirm Password
                      </Typography>

                      <TextField

                        required
                        fullWidth
                        name="confirm_password"
                        label="Confirm Password"
                        type={confirmPasswordType}
                        id="confirm_password"
                        autoComplete="confirm_password"
                        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                        helperText={form?.new_password != form?.confirm_password && "Passwords do not match"}
                        InputProps={{
                          style: { borderRadius: 8 },
                          endAdornment: (

                            <IconButton  >
                              {confirmPasswordType == "Password" ? <VisibilityOffIcon onClick={(e) => {
                                setConfirmPasswordType("Text")
                              }} />
                                :
                                <VisibilityIcon onClick={(e) => {
                                  setConfirmPasswordType("Password")
                                }} />

                              }
                            </IconButton>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>


                {message?.statuscode != 200 && message?.message}
                <Button
                  type={form?.new_password != form?.confirm_password ? "button" : "submit"}
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
                  style={{ background: "linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%)" }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Grid>
        </Box>

      </div>
      <p className={styles.authFooter} >Designed and Developed by <a href="https://icode49.com/"  style={{color:"#e35466" , marginLeft:"5px" , marginRight:"5px"}} target="_blank"> iCode49 Technolabs.</a> All rights reserved 2023
</p>

    </>
  );
};

export default ChangePassword;
