import React, { useState } from "react";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";

import ClearIcon from "@mui/icons-material/Clear";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import delete_onPopUp from "./../../images/delete_onPopUp.png";
import logo from "./../../images/logo.png";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "30vw",
  // width: "100%",
  // maxHeight: "50%",
  // height :"100%",
  bgcolor: "var(--themeColor)",
  boxShadow: 24,
  borderRadius: "8px",
};
export default function EnlargedView({ open, setOpen, content }) {
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
            <Typography
              sx={{
                color: "red",
                width: "100%",
                maxWidth: "100%",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap", // preserves line breaks and wraps text
                overflowWrap: "break-word", // handles long words
                fontSize: "16px",
                padding: "30px 20px",
                maxHeight: "30%",
                overflowY: "auto",
              }}
            >
              {content}
            </Typography>
            {/* <Box>
              <Box
                sx={{
                  background: "var(--themeColor)",
                  padding: "30px 20px",
                  borderRadius: "8px",
                  width: "100%",
                  color: "var(--themeFontColor)",
                }}
                className="dark-BG-101010"
              >
                <span style={{ color: "red", width: "100%" }}>{content}</span>
              </Box>
            </Box> */}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
