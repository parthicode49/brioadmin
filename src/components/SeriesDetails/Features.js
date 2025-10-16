import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";



const Features = ({earning,path}) => {
  const data=earning?.Data
  const plan=path=="MovieDetails"?data?.movie_access:data?.series_name?.series_type
  const FeaturesData = [
  
   
    plan=="TVOD"&&{
      id: "2",
      subTitle: earning?.total_earning,
      title: "Total Earn",
    
    },
   
    
  ];
  return (
    <>
      <Grid
        container item
        justifyContent="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
        sx={{mt:0}}
      >
        {FeaturesData.filter(e=>e)?.map((feature) => (
          <Grid item xs={12} sm={12} md={12} lg={12} key={feature.id} >
            <Link to={feature.link} style={{ textDecoration: 'none' }}>
            <Card
              sx={{
                background: "#fff",
                borderRadius: "10px",
                p: "15px 20px",
                mb: "15px",
                boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                
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
                    sx={{ fontSize: 14, fontWeight: 700 }}
                 textAlign={"center"}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="p"  fontSize={16} fontWeight={700}  textAlign={"center"} width={"100%"} display={"block"}>
                    {feature.subTitle}
                  </Typography>
                </Box>

                
              </Box>

            
            </Card></Link>
          </Grid>
        ))}
        
      </Grid>
    </>
  );
};

export default Features;
