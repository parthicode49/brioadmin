import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

const ThankYouMsg = () => {
  return (
    <div className="ThankYouPic">
    <Grid
      container
      // rowSpacing={1}
      justifyContent="center"
      columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}
      
      
    >
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Card
          sx={{
            boxShadow: "none",
            borderRadius: "10px",
            p: "25px",
            // mb: "15px",
            // mt:"2rem",
            // mx:"2rem",
            m: "3rem",
          }}
        >
          <Box>
            <Typography
              as="h1"
              align="center"
              sx={{
                fontSize: 16,
                mb: "15px",
                fontWeight: 900,
                // mt: "-25px",
                // ml: "-25px",
                // mr: "-25px",
                // padding: "10px 25px",

                borderRadius: "8px 8px 0px 0px",

                // background:
                //   "linear-gradient(225deg,  var(--gradientColorLighter1) 0%, var(--gradientColorLighter2) 91.25%)",

                color: "black",
              }}
            >
              <h2>
                {" "}
                Thank you for taking the time to fill out the
                content information form. We appreciate your time and work in
                filling out the form.
              </h2>
            </Typography>
            <Typography
              as="h1"
              align="center"
              sx={{
                fontSize: 16,
                mb: "15px",
                mt: "5rem",
                fontWeight: 500,
                // mt: "-25px",
                // ml: "-25px",
                // mr: "-25px",
                // padding: "10px 25px",

                borderRadius: "8px 8px 0px 0px",

                // background:
                //   "linear-gradient(225deg,  var(--gradientColorLighter1) 0%, var(--gradientColorLighter2) 91.25%)",

                color: "black",
              }}
            >
              <h3>
                {" "}
                We will carefully analyze the information you provided and, if
                necessary, contact you regarding any additional actions or
                revisions.
              </h3>
            </Typography>
            <Typography
              as="h1"
              align="center"
              sx={{
                fontSize: 16,
                mb: "15px",
                mt: "5rem",
                fontWeight: 500,
                // mt: "-25px",
                // ml: "-25px",
                // mr: "-25px",
                // padding: "10px 25px",

                borderRadius: "8px 8px 0px 0px",

                // background:
                //   "linear-gradient(225deg,  var(--gradientColorLighter1) 0%, var(--gradientColorLighter2) 91.25%)",

                color: "black",
              }}
            >
              <h4>
               
                If you have any queries or require further assistance, please
                get in touch with us at{" "}
                <a href="tel: +91 9136836815"> +91 91368 36815</a> or via email
                at
                <a href="mailto:24sevenflix@gmail.com">24sevenflix@gmail.com</a>
              </h4>
            </Typography>
            <Typography
              as="h1"
              align="center"
              sx={{
                fontSize: 16,
                mb: "15px",
                mt: "5rem",
                fontWeight: 500,
                // mt: "-25px",
                // ml: "-25px",
                // mr: "-25px",
                // padding: "10px 25px",

                borderRadius: "8px 8px 0px 0px",

                // background:
                //   "linear-gradient(225deg,  var(--gradientColorLighter1) 0%, var(--gradientColorLighter2) 91.25%)",

                color: "black",
              }}
            >
              <h4>
                Thank you again for your submission, and we look forward to
                welcoming you as a great distributor partner.
              </h4>
            </Typography>
            <Typography
              as="h1"
              align="center"
              sx={{
                fontSize: 16,
                // mb: "15px",
                mt: "5rem",
                fontWeight: 500,
                // mt: "-25px",
                // ml: "-25px",
                // mr: "-25px",
                // padding: "10px 25px",

                borderRadius: "8px 8px 0px 0px",

                // background:
                //   "linear-gradient(225deg,  var(--gradientColorLighter1) 0%, var(--gradientColorLighter2) 91.25%)",

                color: "black",
              }}
            >
              <p>Best wishes,</p> <p>Team 24sevenflix4u</p>
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
    </div>
  );
};

export default ThankYouMsg;
