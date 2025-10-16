import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import Movie from "./../../../images/3d3.png"
import Advertisement from "./../../../images/Advertisement.png"
import Distrubutor from "./../../../images/Distrubutor.png"
import Livestreaming from "./../../../images/Livestreaming.png"
import transactions from "./../../../images/transactions.png"
import { IMAGE } from "../../../api";


const MaxRentelMovie = ({maxRentelMovie}) => {
    const FeaturesData = [
        {
          id: maxRentelMovie?.[0]?.movie,
          movie_name: maxRentelMovie?.[0]?.sum_transaction,
          title: maxRentelMovie?.[0]?.movie_name,
          image:(IMAGE + maxRentelMovie?.[0]?.movie_poster) ,
          movie_view : maxRentelMovie?.[0]?.movieViews,
          distrubutor_name : maxRentelMovie?.[0]?.movie_distributor,
          producer_name : "-",
          link:"/Movie/MovieDetails",
          backgroundColor:"#FFF5EE"
        },
        // {
        //   id: "2",
        //   movie_name: dashboardcount?.[2]?.["data"],
        //   title: "Live Streaming",
        //   image: Livestreaming,
        //   link:"/LiveStreaming/TVChannel",
        //   backgroundColor:"#FFF5EE"
        // },
        {
          id: maxRentelMovie?.[1]?.movie,
          movie_name: maxRentelMovie?.[1]?.sum_transaction,
          title: maxRentelMovie?.[1]?.movie_name,
          image:(IMAGE + maxRentelMovie?.[1]?.movie_poster) ,
          movie_view : maxRentelMovie?.[1]?.movieViews,
          distrubutor_name : maxRentelMovie?.[1]?.movie_distributor,
          producer_name : "-",
          link:"/Movie/MovieDetails",
          backgroundColor:"#FFF5EE"
        },
        {
          id:maxRentelMovie?.[2]?.movie,
          movie_name: maxRentelMovie?.[2]?.sum_transaction,
          title: maxRentelMovie?.[2]?.movie_name,
          image:(IMAGE + maxRentelMovie?.[2]?.movie_poster) ,
          movie_view : maxRentelMovie?.[2]?.movieViews,
          distrubutor_name : maxRentelMovie?.[2]?.movie_distributor,
          producer_name : "-",
          link:"/Movie/MovieDetails",
          backgroundColor:"#FFF5EE"
        },
        {
          id:maxRentelMovie?.[3]?.movie,
          movie_name: maxRentelMovie?.[3]?.sum_transaction,
          title: maxRentelMovie?.[3]?.movie_name,
          image:(IMAGE + maxRentelMovie?.[3]?.movie_poster) ,
          movie_view : maxRentelMovie?.[3]?.movieViews,
          distrubutor_name : maxRentelMovie?.[3]?.movie_distributor,
          producer_name : "-",
          link:"/Movie/MovieDetails",
          backgroundColor:"#FFF5EE"
        },
        {
          id:maxRentelMovie?.[4]?.movie,
          movie_name: maxRentelMovie?.[4]?.sum_transaction,
          title: maxRentelMovie?.[4]?.movie_name,
          image:(IMAGE + maxRentelMovie?.[4]?.movie_poster) ,
          movie_view : maxRentelMovie?.[4]?.movieViews,
          distrubutor_name : maxRentelMovie?.[4]?.movie_distributor,
          producer_name : "-",
          link:"/Movie/MovieDetails",
          backgroundColor:"#FFF5EE"
        },  
        //    {
        //       id: "3",
        //       movie_name:  5,
        //       title: "Advertisements",
        //       image: transactions,
        //       link:"/Advertisers/Advertisers/"
        //     },
      
      ].filter((e)=>e);
  return (
    <Grid
    container
    justifyContent="center"
    rowSpacing={1}
    columnSpacing={{ xs: 1, sm: 2, md: 2 }}
  >
    {FeaturesData.map((feature,index) => (
      <Grid item xs={12} sm={6} md={2.4} lg={2.4} key={"MaxRentalMovies"+index} >
        <Link to={feature.link} state={{ "id" : feature.id}} style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            // background: "#000",
            background: " var(--themeColor) ",
            borderRadius: "10px",
            p: "25px 20px", 
            mb: "15px",
            // boxShadow: "var(--gradientColorLighter2) 0px 6px 12px -2px, var(--gradientColorLighter1) 0px 3px 7px -3px",
            boxShadow: "var(--themeShadow)",

            
            
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection:"column",
              gap:"1rem"
              
            }}
          >
            <Box
              sx={{
                // width: "300px",
                // height: "170px",
                lineHeight: "85px",
                background: "#ffffff17",
                borderRadius: "10px",
                borderRadius: "8px",
                textAlign: "center",
                
              }}
            >
              <img src={feature.image} alt="Graph"  height="250" style={{borderRadius:"10px"}}/>
            </Box>
            <Box>
              <Typography
                variant="h1"
                sx={{ fontSize: 20, fontWeight: 700,textAlign:"center" }}
             
              >
               <span style={{color:"var(--themeFontColor)"}}> {feature.title}</span>
              </Typography>
              <Box sx={{display:"flex" ,marginTop:"1rem" ,justifyContent:"space-between" , width:"100%"   }}>
              <Typography variant="p"  fontSize={16} fontWeight={400}    display={"block"} >
               <span style={{color:"var(--themeFontColor)"}}> Totel Earing :-</span>
              </Typography>
              <Typography variant="p"  fontSize={16} fontWeight={400}  display={"block"} >
               <span style={{color:"var(--themeFontColor)"}}> ₹ {(feature.movie_name)?.toFixed(2)} </span>
              </Typography>
              
              </Box>
              <Box sx={{display:"flex" ,marginTop:"1rem" ,justifyContent:"space-between" , width:"100%"   }}>
              <Typography variant="p"  fontSize={16} fontWeight={400}  display={"block"} >
               <span style={{color:"var(--themeFontColor)" }}> Totel View :-</span>
              </Typography>
              <Typography variant="p"  fontSize={16} fontWeight={400} display={"block"} >
               <span style={{color:"var(--themeFontColor)"  }}> {feature.movie_view}</span>
              </Typography>
              
              </Box>
              <Box sx={{display:"flex" ,marginTop:"1rem" ,justifyContent:"space-between" , width:"100%"   }}>
              <Typography variant="p"  fontSize={16} fontWeight={400}   display={"block"} >
               <span style={{color:"var(--themeFontColor)"}}>Distrubutor :- </span>
              </Typography>
              <Typography variant="p"  fontSize={16} fontWeight={400}  display={"block"} >
               <span style={{color:"var(--themeFontColor)", marginLeft:"5px" }}> {feature.distrubutor_name}</span>
              </Typography>
              
              </Box>
              <Box sx={{display:"flex" ,marginTop:"1rem" ,justifyContent:"space-between" , width:"100%"   }}>
              <Typography variant="p"  fontSize={16} fontWeight={400} display={"block"} >
               <span style={{color:"var(--themeFontColor)"}}> Producer :-</span>
              </Typography>
              <Typography variant="p"  fontSize={16} fontWeight={400}   display={"block"} >
               <span style={{color:"var(--themeFontColor)"  }}> {feature.producer_name}</span>
              </Typography>
              
              </Box>
             
              
            </Box>

            
          </Box>

        
        </Card></Link>
      </Grid>
    ))}
    
  </Grid>
  )
}

export default MaxRentelMovie