import React,{useEffect} from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {useSelector,useDispatch} from "react-redux"
import {Link} from "react-router-dom";
import Movie from "./../../../images/Movie.png"
import Advertisement from "./../../../images/Advertisement.png"
import Distrubutor from "./../../../images/Distrubutor.png"
import Livestreaming from "./../../../images/Livestreaming.png"
import transactions from "./../../../images/transactions.png"
import { live_movie_view_list } from '../../../actions/live_movie_view';


const Features = ({dashboardcount,role}) => {
  const dispatch=useDispatch()
  const liveUserCount=useSelector((state) => state?.currenttime?.currenttime?.data)?.length
  useEffect(() => {
   
        dispatch(live_movie_view_list());


}, []);
  const FeaturesData = [
  
    {
      id: "1",
      subTitle: dashboardcount?.[0]?.["data"],
      title: "Movies",
      image: Movie,
      link:"/Movie/Movie",
      backgroundColor:"var(--themeFontColor)"
    },
    // {
    //   id: "2",
    //   subTitle: dashboardcount?.[2]?.["data"],
    //   title: "Live Streaming",
    //   image: Livestreaming,
    //   link:"/LiveStreaming/TVChannel",
    //   backgroundColor:"var(--themeFontColor)"
    // },
    {
      id: "5",
      subTitle: dashboardcount?.[1]?.["data"],
      title: "Web Series",
      image: Distrubutor,
      link:"/Series/Series/"
    },
    role!="Distributor"&&{
      id: "3",
      subTitle:  dashboardcount?.[2]?.["data"],
      title: "Transactions",
      image: transactions,
      link:"/Transactions/Transactions"
    },
    role!="Distributor"&&{
      id: "3",
      subTitle:  dashboardcount?.[3]?.["data"],
      title: "Advertisements",
      image: transactions,
      link:"/Advertisers/Advertisers/"
    },
    role!="Distributor"&&{
      id: "3",
      subTitle:  dashboardcount?.[4]?.["data"],
      title: "Distributors",
      image: transactions,
      link:"/Distributors/Distributors/"
    },
    role!="Distributor"&&{
      id: "3",
      subTitle:  dashboardcount?.[5]?.["data"],
      title: "Complaints",
      image: transactions,
      link:"/Complaint/Complaint/"
    },
    role!="Distributor"&&{
      id: "4",
      subTitle: dashboardcount?.[6]?.["data"],
      title: "TVOD Customers",
      image: transactions,
      state:"TVOD",
      link:"/Transactions/Transactions"
    },
    // role!="Producer"&&{
    //   id: "5",
    //   subTitle: dashboardcount?.[7]?.["data"],
    //   title: "Promocodes",
    //   image: Distrubutor,
    //   link:"/Coupon/Coupon"
    // }, 
    role!="Producer"&&{
      id: "6",
      subTitle: liveUserCount,
      title: "Real time Movie Tracking",
      image: Advertisement,
      link:"/LiveMovieView/LiveMovieView/"
    },
     role!="Distributor"&&{
      id: "6",
      subTitle: 4,
      title: "Subscriptions",
      image: Advertisement,
      link:"/Subscriptions/Subscriptions/"
    },
     role!="Distributor"&&{
      id: "6",
      subTitle: 6,
      title: "Reports",
      image: Advertisement,
      link:"/reports/reports/"
    },
    // role!="Producer"&&{
    //   id: "6",
    //   subTitle: 6,
    //   title: "Promotions",
    //   image: Advertisement,
    //   link:"/Promotion/Promotion/"
    // },
    
  ].filter((e)=>e);
  return (
    <>
      <Grid
        container
        justifyContent="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      >
        {FeaturesData.map((feature,index) => (
          <Grid item xs={10} sm={4} md={2.4} lg={role!="Producer"?2.4:6} key={feature.title+index} >
            <Link to={feature.link} state={feature.state} style={{ textDecoration: 'none' }}>
            <Card
              sx={{
                // background: "#000",
                background: "linear-gradient(225deg, var(--themeColor) 0%,var(--themeColorLightestShade) 91.25%)",
                borderRadius: "10px",
                p: "25px 20px",
                mb: "15px",
                // boxShadow: "var(--gradientColorLighter2) 0px 6px 12px -2px, var(--gradientColorLighter1) 0px 3px 7px -3px",
                boxShadow: "var(--themeShadow)",

                // border: "1px solid #363535"
                
                
              }}
              className="features_box"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  
                }}
              >
                {/* <Box
                  sx={{
                    width: "62px",
                    height: "62px",
                    lineHeight: "85px",
                    background: "#ffffff17",
                    borderRadius: "8px",
                    textAlign: "center",
                    
                  }}
                >
                  <img src={feature.image} alt="Graph" style={{verticalAlign:"baseline"}}/>
                </Box> */}
                <Box>
                  <Typography
                    variant="h1"
                    sx={{ fontSize: 20, fontWeight: 700,textAlign:"center" }}
                 
                  >
                   <span style={{color:"var(--themeFontColor)"}}> {feature.title}</span>
                  </Typography>
                  <Typography variant="p"  fontSize={16} fontWeight={700}  textAlign={"center"} width={"100%"} display={"block"} >
                   <span style={{color:"#e55e08"}}> {feature.subTitle}</span>
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
