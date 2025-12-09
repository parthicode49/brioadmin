import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
// import thumbnail from "./../../images/thumbnail.jpg";
import "./ProductDetailsContent.css";
// import view from "./../../images/View.png";
// import Like from "./../../images/Like.png";
// import download from "./../../images/download.png";
import { IMAGE } from "../../../../api/index";
const ProductProfile = ({ data, path }) => {
  return (
    <>
      <Card
        sx={{
          textAlign: "center",
          boxShadow: "var(--themeShadow)",
          borderRadius: "10px",
          p: "15px 15px",
          mb: "15px",
          backgroundColor: "var(--themeColor)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            height: "230px",
          }}
        >
          {/* {
            <img
              src={IMAGE + data?.poster}
              alt="Member"
              // width="148px"
              height="200px"
              style={{ borderRadius: "10px" }}
            />
          } */}

          <img
            src={IMAGE + data?.thumbnail}
            alt="Image"
            height="200px"
            style={{ borderRadius: "10px" }}
          />
        </div>
        <Typography
          as="h4"
          sx={{
            fontSize: 16,
            fontWeight: 500,
            mt: "10px",
          }}
        >
          {data?.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            textAlign: "center",
            mt: "20px",
          }}
        >
          <Box>
            <Typography color="#A9A9C8" fontSize="13px">
              {/* <img src={view} height={"50px"} /> */}Views
            </Typography>
            <Typography fontWeight="500" fontSize="16px">
              {data?.episode_view_count || 0}
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default ProductProfile;
