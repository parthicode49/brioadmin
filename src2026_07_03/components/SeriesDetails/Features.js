import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Features = ({ data, path }) => {
  const FeaturesData = [
    data?.content_access == "TVOD" && {
      id: "2",
      subTitle: data?.series_total_revenue,
      title: "Total Earning",
      // title:"Gross Profit",
      // title1:" ."
    },
    data?.content_access == "TVOD" &&
      data?.ownership == "Content Owner" && {
        id: "3",
        subTitle: data?.admin_earning,
        title: "Platform",
        // title:"Net Profit Share",
        // title1 : "(24 SEVEN FLIX4U)",
        // subTitle: 203770.37,
      },
    data?.content_access == "TVOD" &&
      data?.ownership == "Content Owner" && {
        id: "4",
        subTitle: data?.content_owner_earning,
        title: "Distributor",
        // title:"Net Profit Share",
        // title1:"(Content Creator)",
        // subTitle: 203770.37,
      },
    data?.content_access == "SVOD" &&
      data?.ownership == "Content Owner" && {
        id: "4",
        subTitle: data?.content_owner_earning,
        title: "Cotent Owner Earning",
        // title:"Net Profit Share",
        // title1:"(Content Creator)",
        // subTitle: 203770.37,
      },
  ].filter(Boolean);
  return (
    <>
      <Grid
        container
        item
        justifyContent="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
        sx={{ mt: 0 }}
      >
        {FeaturesData?.filter((e) => e)?.map((feature) => (
          <Grid item xs={12} sm={6} md={3} lg={2} key={feature.id}>
            <Link to={feature.link} style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  background: "var(--themeColor)",
                  borderRadius: "10px",
                  p: "15px 20px",
                  mb: "15px",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h1"
                      sx={{ fontSize: 14, fontWeight: 500 }}
                      textAlign={"center"}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="p"
                      fontSize={18}
                      fontWeight={900}
                      textAlign={"center"}
                      width={"100%"}
                      display={"block"}
                    >
                      $ {parseFloat(feature.subTitle).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Features;
