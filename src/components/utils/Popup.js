import React, { useState } from "react";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";

import ClearIcon from "@mui/icons-material/Clear";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import delete_onPopUp from "./../../images/delete_onPopUp.png";
import logo from "./../../images/logo.png";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "var(--themeColor)",
  boxShadow: 24,
  borderRadius: "8px",
};
export default function Popup({ open, setOpen, content, setResult }) {
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="dark-BG-101010">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "var(--themeColor)",
                borderRadius: "8px",
                padding: "5px 20px",
              }}
              className="bg-black"
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: "500",
                  fontSize: "20px",
                  textAlign: "center",
                  width: "100%",
                  mr: "-1rem",
                }}
              >
                <img src={logo} width={"50px"} />
              </Typography>

              <IconButton
                aria-label="remove"
                size="small"
                onClick={handleClose}
                className="modal-close"
              >
                <img src={delete_onPopUp} width={"30px"} />
              </IconButton>
            </Box>

            <Box>
              <Box
                sx={{
                  background: "var(--themeColor)",
                  padding: "30px 20px",

                  borderRadius: "8px",

                  color: "var(--themeFontColor)",
                }}
                className="dark-BG-101010"
              >
                {typeof content == "string" ? (
                  <Typography
                    id="modal-modal-title"
                    align="center"
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: "500",
                      fontSize: "20px",
                    }}
                  >
                    <span style={{ color: "var(--themeFontColor)" }}>
                      {content}
                    </span>
                  </Typography>
                ) : (
                  <>
                    <Typography
                      id="modal-modal-title"
                      align="center"
                      variant="h6"
                      component="h2"
                      sx={{
                        fontWeight: "500",
                        fontSize: "20px",
                      }}
                    >
                      <span style={{ color: "var(--themeFontColor)" }}>
                        {" "}
                        {content[0]}
                      </span>
                    </Typography>
                    <Typography
                      id="modal-modal-title"
                      align="center"
                      sx={{
                        fontWeight: "400",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ color: "var(--themeFontColor)" }}>
                        {content[1]}
                      </span>
                    </Typography>
                  </>
                )}
              </Box>
              <Box
                sx={{
                  padding: "30px 20px",
                  display: "flex",
                  paddingTop: "0",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  variant="contained"
                  color="info"
                  sx={{
                    textTransform: "capitalize",
                    borderRadius: "10px",

                    p: "10px 30px",
                    fontSize: "14px",
                    color: "#fff !important",
                  }}
                  style={{
                    background:
                      "linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%)",
                  }}
                  className="mr-10px"
                  onClick={() => (setResult(true), setOpen(false))}
                >
                  Yes
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  sx={{
                    textTransform: "capitalize",
                    borderRadius: "10px",

                    p: "10px 30px",
                    fontSize: "14px",
                    color: "#fff !important",
                  }}
                  style={{
                    background:
                      "linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%)",
                  }}
                  className="mr-10px"
                  onClick={() => (setResult(false), setOpen(false))}
                >
                  No
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
