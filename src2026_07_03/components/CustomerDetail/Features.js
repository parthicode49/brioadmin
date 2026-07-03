import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import users from "./../../images/movies_download.png"
import graph from "./../../images/movies_watched.png"
import work from "./../../images/movies_rented.png"
import { Link } from "react-router-dom";
import Movie from "../../images/CustomerDetails/Movie.png"
import Episode from "../../images/CustomerDetails/Episode.png"
import Song from "../../images/CustomerDetails/Song.png"
import Rentel from "../../images/CustomerDetails/rentelVideo.png"
import watchList from "../../images/CustomerDetails/watchList.png"


const Features = ({data}) => {
  const FeaturesData = [
    // {
    //   id: "1",
    //   subTitle: "Movies Downloaded",
    //   title: data?.download_count,
    //   image: users,
    //   link:"/Customer/CustomerDetail/MoviesDownloaded",
    //   data:data?.download
    // },
    {
      id: "1",
      subTitle: "Movies Seen",
      title: data?.movie_watch_count,
      image: Movie,
      link:"/customer/detail/moviewatch",
      data:data?.movie_watch_history
    },
    {
      id: "2",
      subTitle: "Episode Seen",
      title: data?.episode_watch_count,
      image: Episode,
      link:"/customer/detail/episodewatch",
      data:data?.episode_watch_history
    },
    {
      id: "3",
      subTitle: "Song Seen",
      title: data?.song_watch_count,
      image: Song,
      link:"/customer/detail/songwatch",
      data:data?.song_watch_history
    },
    {
      id: "4",
      subTitle: "Rented Content",
      title: data?.rental_movie_count,
      image: Rentel,
      link:"videorental",
      data:data?.rental_movie_list
    },
    {
      id: "5",
      subTitle: "Watch List",
      title: data?.watchlist_count,
      image: watchList,
      link:"/customer/detail/watchlist",
      data:data?.watch_list_data
    }
  ];
  return (
    <>
      <Grid
        container
        justifyContent="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      >
        {FeaturesData?.map((feature) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={feature.id}>
            <Link to={feature.link} state={{data:feature.data}}>
            <Card
              sx={{
                boxShadow: "var(--themeShadow)",
                background:"var(--themeColor)",
                borderRadius: "10px",
                p: "30px 20px 20px",
                mb: "15px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "55px",
                    height: "55px",
                    lineHeight: "85px",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                  className='mr-15px'
                >
                  <img src={feature.image} alt="Icon" style={{verticalAlign:"baseline"}} height={"45px"} />
                </Box>

                <Box>
                  <Typography variant="p" sx={{ fontSize: '13px' }}>
                    {feature.subTitle}
                  </Typography>
                  <Typography
                    variant="h1"
                    sx={{ fontSize: 28, fontWeight: 700, mt: "5px" }}
                  >
                    <span style={{color:"#ff3636"}}>{feature.title}</span>
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
