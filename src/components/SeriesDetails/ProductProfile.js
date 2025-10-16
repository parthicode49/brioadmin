import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import "./ProductDetailsContent.css";
import { IMAGE } from "./../../api/index";
import { Box } from "@mui/material";
const ProductProfile = ({ data }) => {
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
          <img
            src={IMAGE + data?.thumbnail}
            alt="Member"
            height="200px"
            style={{ borderRadius: "10px" }}
          />

          <img
            src={IMAGE + data?.poster}
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
          {data?.title.length <= 50
            ? data?.title
            : data?.title.substring(0, 50) + "..."}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            textAlign: "center",
            mt: "10px",
          }}
        >
          {/* 
					<Box>
						<Typography color="#A9A9C8" fontSize="13px">
						Downloads
						</Typography>
						<Typography fontWeight="500" fontSize="16px">
							{data?.total_downloads}
						</Typography>
					</Box> */}

          <Box>
            <Typography color="#A9A9C8" fontSize="13px">
              Views
            </Typography>
            <Typography fontWeight="500" fontSize="16px">
              {data?.episodeViews || 0}
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default ProductProfile;
