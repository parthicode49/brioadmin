import React from "react";
import { Stack, Box, Typography, Link } from "@mui/material";

const Footer = () => {
  const year=new Date().getFullYear()
  return (
    <>
      <Stack
        sx={{

          // backgroundColor: "#fff",
          p: "25px",
          borderRadius: "10px 10px 0 0",
          textAlign: "center",
          mt: "15px"
        }}
        className="footer"
      >
        <Box >
          <Typography>
            Designed and Developed by <a style={{color:"#e35466"}} href="https://icode49.com/" target="_blank">iCode49 Technolabs.</a> All rights reserved {year}


          </Typography>
        </Box>
      </Stack>
    </>
  );
};

export default Footer;
