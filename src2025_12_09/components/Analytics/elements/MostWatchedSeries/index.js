import React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import styles from "./MostWatchedSeries.module.css"
import { IMAGE } from "../../../../api";



import { Link } from "react-router-dom";
const MostWatchedSeries = ({tv_show_dashboard}) => {
 
  const NewCustomersData = tv_show_dashboard?.most_watch_tv_shows||[];
  return (
    <>
      <Card
        sx={{
          boxShadow: "var(--gradientColorLighter2) 0px 6px 12px -2px, var(--gradientColorLighter1) 0px 3px 7px -3px",
          borderRadius: "10px",
          p: "25px 20px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "10px",
            mb: "20px",
          }}
          className="for-dark-bottom-border"
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Most Watched TV Shows
          </Typography>

          
      
        </Box>

        <Box>
          {NewCustomersData.slice(0, 5).map((movie) => (
            <div className={styles.newCustomerList} key={movie?.id}>
                   <Link
                                style={{ color: "inherit" }}
                                to="/Series/Series/SeriesDetails"
                                state={{ id: movie.id, name: movie.series_name }}
                              >
              <div className={styles.leftContent}>
                <img src={IMAGE+movie?.series_thumbnail} alt="user" />
                <div>
                  <p style={{fontWeight:"600" , color:"var(--themeFontColor)"}}>{movie?.series_name}</p>
                  {/* <p style={{color:"var(--themeFontColor)"}}>{movie?.season}</p> */}
                  <p style={{color:"var(--themeFontColor)"}}>{movie?.genre?.map((ele,index)=>ele?.genre_title+(index<movie?.genre.length-1?",":""))}</p>
                  
                </div>
              </div>
              </Link>
              <div className={styles.rightContent}>
                <div className={styles.published_by}>
                <p style={{color:"var(--themeFontColor)"}}>Views : {movie?.total_view}</p>
                <p style={{color:"var(--themeFontColor)"}}>{movie?.watch_hours}</p>
                </div>
                {/* <div className={styles.downloads}>
                  {movie?.seriesViews||0}
                </div> */}
              </div>
            </div>
          ))}
        </Box>
      </Card>
    </>
  );
};

export default MostWatchedSeries;
