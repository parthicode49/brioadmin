import React, { useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Alert, Snackbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./Authentication.module.css";
import './Authentication.css'
import favicon from "./../../images/logo.png"
import { forgot_password } from "../../actions/authenticate";
import EmailIcon from '@mui/icons-material/Email';
import { InputAdornment } from '@mui/material';
import LoginImg from "../../images/login_bg.jpg";
import { useDispatch, useSelector } from "react-redux";
const ForgotPasswordForm = () => {
  const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState({ msg: "", status: null });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    dispatch(forgot_password({
      username: data.get("username"),
    }))
  };
    const handleClose = () => {
    setOpen(false);
  };
  const message = useSelector((state) => state.layout.message);
  return (
    <>
      <div className={styles.newauthenticationBox}>
        <div className={styles.newauthenticationBoxImageDiv}>
          <img src={LoginImg} />
        </div>
        <div className={styles.newauthenticationBoxLoginDiv}>
          <div className={styles.logoImg}>
            <img src={favicon} />
          </div>
          <div className={styles.loginText}>
            <span> .</span>
            <p>Forgot Password</p>
          </div>
          <div className={styles.loginForm}>
            <form onSubmit={handleSubmit}>
              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "14px",
                    mb: "6px",
                    color: "#333 !important ",
                  }}
                >
                  Email
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter Email"
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
                  backgroundColor: "#FF7827",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "16px",
                  py: 1.5,
                  borderRadius: 2,
                  ":hover": {
                    backgroundColor: "#FF7827",
                  },
                }}
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity="info" variant="filled" color="success">
          {msg?.msg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ForgotPasswordForm;
