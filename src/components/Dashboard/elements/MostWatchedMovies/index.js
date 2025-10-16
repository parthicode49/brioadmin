import React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import styles from "./MostWatchedMovies.module.css";
import { IMAGE } from "./../../../../api";

import { Link } from "react-router-dom";

const MostWatchedMovies = ({ most_watch_movies }) => {
  const NewCustomersData = most_watch_movies || [];
  // console.log(ne)
  return (
    <>
      <Card
        sx={{
          boxShadow:
            "var(--gradientColorLighter2) 0px 6px 12px -2px, var(--gradientColorLighter1) 0px 3px 7px -3px",
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
            Most Watched Movies
          </Typography>
        </Box>

        <Box  sx={{height : "350px" ,     overflowY : "auto"}}>
          {NewCustomersData?.data?.map((movie) => (
            <div className={styles.newCustomerList} key={movie?.id}>
              <Link
                style={{ color: "inherit" }}
                to="/movie/detail"
                state={{ id: movie.id, name: movie.movie_name }}
              >
                <div className={styles.leftContent}>
                  <img src={IMAGE + movie?.poster} alt="user" />
                  <div>
                    <p
                      style={{
                        fontWeight: "600",
                        color: "var(--themeFontColor)",
                      }}
                    >
                      {movie?.title}
                    </p>
                    {/* <p style={{color:"var(--themeFontColor)"}}>{movie?.movie_subcategory}</p> */}
                    <p style={{ color: "var(--themeFontColor)" }}>
                      {" "}
                      {movie?.content_access}
                    </p>
                  </div>
                </div>
              </Link>
              <div className={styles.rightContent}>
                <div className={styles.published_by}>
                  {/* <p style={{color:"var(--themeFontColor)"}}>{movie?.watch_hours?.watch_hours}</p> */}
                  <p style={{ color: "var(--themeFontColor)" }}>
                    Views : {movie?.watch_count}
                  </p>
                </div>
                {/* <div className={styles.downloads}>
                  {movie?.movieDownloads||0}
                </div> */}
              </div>
            </div>
          ))}
        </Box>
      </Card>
    </>
  );
};

export default MostWatchedMovies;
