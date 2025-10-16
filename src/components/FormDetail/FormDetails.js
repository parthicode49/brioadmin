import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

// import poster from "./../../images/poster.jpg";
// import "./ProductDetailsContent.css";
// import Features from "./Features";
// import ProductProfile from "./ProductProfile";
import {
  producer_movie_detail_form,
  producer_movie_form_update,
} from "./../../actions/producer";
// import { episode_details } from "./../../actions/WebSeries/episode";
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE } from "./../../api/index";
import { saveAs } from "file-saver";
import { Button, TextField } from "@mui/material";

// import WatchedCustomers from "./WatchedCustomers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const FormDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const role = useSelector((state) => state.layout.role);

  const [disBtn, setDisBtn] = useState(false);
  const formData = new FormData();
  formData.append("id", location.state?.id);
  useMemo(() => {
    dispatch(producer_movie_detail_form(formData));
  }, [location.state?.id]);
  const role = useSelector((state) => state.layout.role);
  const [rejectMsg, setRejectMsg] = useState("");
  const [showRejectBtn, setShowRejectBtn] = useState(false);

  const producerformdata = useSelector(
    (state) => state.producer.formdetail?.data
  );
  //   const data = useSelector((state) =>
  //     path == "MovieDetails"
  //       ? state.movies.movie?.Data
  //       : state?.webseries?.episode?.Data
  //   );
  //   const cast = useSelector((state) =>
  //     path == "MovieDetails"
  //       ? state.movies.movie?.Cast
  //       : state.webseries?.episode?.Data?.episode_cast
  //   );
  //   const watch_hours = useSelector((state) =>
  //     path == "MovieDetails"
  //       ? state.movies.movie?.watch_hours
  //       : state.webseries?.episode
  //   );
  const Subtitle_list = useSelector(
    (state) => state.producer.formdetail?.data?.subtitle_list
  );
  const Audio_list = useSelector(
    (state) => state.producer.formdetail?.data?.audio_file_list
  );
  const SubtitleCount = useSelector(
    (state) => state.producer.formdetail?.data?.subtitle_count
  );
  const AudioCount = useSelector(
    (state) => state.producer.formdetail?.data?.audio_file_count
  );

  useMemo(() => {
    if (producerformdata?.status == "Approve") {
      setDisBtn(true);
      // window.location.reload(true)
    } else {
      setDisBtn(false);
    }
  }, [producerformdata?.status]);
  const handleApprove = () => {
    const data = new FormData();
    data.append("id", location.state?.id);
    data.append("status", "Approved");
    dispatch(producer_movie_form_update(data));
    window.location.reload();
    setShowRejectBtn(false);
  };
  const handleReject = () => {
    setShowRejectBtn(true);
  };

  const handleRegMsg = () => {
    const data = new FormData();
    data.append("id", location.state?.id);
    data.append("status", "Rejected");
    data.append("reject_message", rejectMsg);
    dispatch(producer_movie_form_update(data));
    setRejectMsg("");
    window.location.reload();
  };
  //   const earning = useSelector((state) => state.webseries?.episode);
  //   // const earning1 =useSelector((state) =>state)

  //   const access =
  //     path == "MovieDetails"
  //       ? data?.movie_access

  return (
    <>
      <Grid
        container
        rowSpacing={1}
        justifyContent="center"
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}
      >
        <Grid item spacing={4} xs={12} sm={12} md={6} lg={7} xl={7}>
          <Card
            sx={{
              boxShadow: "none",
              borderRadius: "10px",
              p: "15px 25px",
              mb: "15px",
            }}
          >
            <Box mt={2}>
              <Tabs className="product-details-tabs">
                <TabList>
                  <Tab>
                    {producerformdata?.category_type == "Movie"
                      ? "Movie Details"
                      : "Series Details"}
                  </Tab>
                  <Tab>Dates & Country</Tab>
                  <Tab>Profit Share</Tab>
                  {/* <Tab>Links</Tab> */}
                </TabList>

                <TabPanel>
                  <Card
                    sx={{
                      boxShadow: "none",
                      borderRadius: "10px",
                      p: "25px 20px",
                      mb: "10px",
                      backgroundColor: "#F7FAFF",
                    }}
                  >
                    <Typography
                      as="h3"
                      sx={{
                        fontSize: 16,
                        mb: "15px",
                        fontWeight: 500,
                        mt: "-25px",
                        ml: "-25px",
                        mr: "-25px",
                        padding: "10px 25px",
                        borderRadius: "8px 8px 0px 0px",
                        background:
                          "linear-gradient(225deg,  var(--gradientColorLighter1) 0%, var(--gradientColorLighter2) 91.25%)",

                        color: "white !important",
                      }}
                    >
                      {producerformdata?.category_type == "Movie"
                        ? "Movie"
                        : "Series"}
                      Details
                    </Typography>

                    <Box>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Category:
                        </span>
                        {producerformdata?.category_type == "Movie"
                          ? producerformdata?.type_of_film
                          : producerformdata?.type_of_series}
                      </Typography>

                      {/* {path != "MovieDetails" && (
                        <Typography
                          sx={{
                            fontSize: 13,
                            mt: "10px",
                            display: "flex",
                          }}
                        >
                          <span
                            style={{
                              width: "150px",
                              fontWeight: "500",
                            }}
                            className="mr-10px"
                          >
                            Series Name:
                          </span>
                          {data?.series_name}
                        </Typography>
                      )} */}
                      {!producerformdata?.category_type == "Movie" && (
                        <Typography
                          sx={{
                            fontSize: 13,
                            mt: "10px",
                            display: "flex",
                          }}
                        >
                          <span
                            style={{
                              width: "150px",
                              fontWeight: "500",
                            }}
                            className="mr-10px"
                          >
                            season :
                          </span>
                          {producerformdata?.season}
                        </Typography>
                      )}

                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Language:
                        </span>
                        {producerformdata?.language?.language_name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Rent:
                        </span>
                        {parseFloat(producerformdata?.rent).toFixed(2)} INR
                        {/* {producerformdata?.rent} */}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          title:
                        </span>
                        {producerformdata?.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Festival Awards:
                        </span>
                        {producerformdata?.festival_awards}
                      </Typography>
                    </Box>
                  </Card>
                </TabPanel>
                <TabPanel>
                  <Card
                    sx={{
                      boxShadow: "none",
                      borderRadius: "10px",
                      p: "25px 20px",
                      mb: "10px",
                      backgroundColor: "#F7FAFF",
                    }}
                  >
                    <Typography
                      as="h3"
                      sx={{
                        fontSize: 16,
                        fontWeight: 500,
                        mb: "15px",
                        mt: "-25px",
                        ml: "-25px",
                        mr: "-25px",
                        padding: "10px 25px",
                        borderRadius: "8px 8px 0px 0px",
                        background:
                          "linear-gradient(225deg,  var(--gradientColorLighter1) 0%, var(--gradientColorLighter2) 91.25%)",

                        color: "white !important",
                      }}
                    >
                      Dates & Country
                    </Typography>

                    <Box>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Released Status :
                        </span>
                        {producerformdata?.movie_released_status}
                      </Typography>
                      {producerformdata?.theatrical_date && (
                        <Typography
                          sx={{
                            fontSize: 13,
                            mt: "10px",
                            display: "flex",
                          }}
                        >
                          <span
                            style={{
                              width: "150px",
                              fontWeight: "500",
                            }}
                            className="mr-10px"
                          >
                            Release Date :
                          </span>
                          {producerformdata?.theatrical_date}
                        </Typography>
                      )}
                      {!producerformdata?.theatrical_date && (
                        <Typography
                          sx={{
                            fontSize: 13,
                            mt: "10px",
                            display: "flex",
                          }}
                        >
                          <span
                            style={{
                              width: "150px",
                              fontWeight: "500",
                            }}
                            className="mr-10px"
                          >
                            Premiere Date:
                          </span>
                          {producerformdata?.proposed_premiere_date}
                        </Typography>
                      )}
                      {!producerformdata?.theatrical_date && (
                        <Typography
                          sx={{
                            fontSize: 13,
                            mt: "10px",
                            display: "flex",
                          }}
                        >
                          <span
                            style={{
                              width: "150px",
                              fontWeight: "500",
                            }}
                            className="mr-10px"
                          >
                            Theatrical Date
                          </span>
                          {producerformdata?.theatrical_date}
                        </Typography>
                      )}
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Production Year
                        </span>
                        {producerformdata?.year_of_production}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Country Of Origin
                        </span>
                        {producerformdata?.country_of_origin}
                      </Typography>
                    </Box>
                  </Card>
                </TabPanel>
                <TabPanel>
                  <Card
                    sx={{
                      boxShadow: "none",
                      borderRadius: "10px",
                      p: "25px 20px",
                      mb: "10px",
                      backgroundColor: "#F7FAFF",
                    }}
                  >
                    <Typography
                      as="h3"
                      sx={{
                        fontSize: 16,
                        fontWeight: 500,
                        mb: "15px",
                        mt: "-25px",
                        ml: "-25px",
                        mr: "-25px",
                        padding: "10px 25px",
                        borderRadius: "8px 8px 0px 0px",
                        background:
                          "linear-gradient(225deg,  var(--gradientColorLighter1) 0%, var(--gradientColorLighter2) 91.25%)",

                        color: "white !important",
                      }}
                    >
                Profit Share
                    </Typography>

                    <Box>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Admin's Share :
                        </span>
                        {producerformdata?.admin_share}%
                      </Typography>
                   
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Distributor's Share :
                        </span>
                        {producerformdata?.distributor_share}%
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                         Producer's Share :
                        </span>
                        {producerformdata?.producer_share}%
                      </Typography>
                    </Box>
                  </Card>
                </TabPanel>
                {/* <TabPanel>
                  <Card
                    sx={{
                      boxShadow: "none",
                      borderRadius: "10px",
                      p: "25px 20px",
                      mb: "10px",
                      backgroundColor: "#F7FAFF",
                    }}
                  >
                    <Typography
                      as="h3"
                      sx={{
                        fontSize: 16,
                        fontWeight: 500,
                        mb: "15px",
                        mt: "-25px",
                        ml: "-25px",
                        mr: "-25px",
                        padding: "10px 25px",
                        borderRadius: "8px 8px 0px 0px",
                        background:
                          "linear-gradient(225deg,  var(--gradientColorLighter1) 0%, var(--gradientColorLighter2) 91.25%)",

                          color: "white !important",
                      }}
                    >
                     Links & Content
                    </Typography>

                    <Box>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Trailer Link :
                        </span>
                       {producerformdata?.trailer_link}
                      </Typography>

                   
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                         mp4_URL:
                        </span>
                        {producerformdata?.mp4_URL}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                        Imdb / facebook Url
                        </span>
                        {producerformdata?.imdb_facebook_url}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Sound Format

                        </span>
                       {producerformdata?.sound_format_required}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                       Country Of Oragin
                        </span>
                       {producerformdata?.country_of_origin}
                      </Typography>
                    </Box>
                  </Card>
                </TabPanel> */}
              </Tabs>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={5} xl={5} key={"sdcsdc"}>
          {/* <ProductProfile data={data} path={path} />
          <Features earning={earning} path={path} /> */}
          <Card
            sx={{
              boxShadow: "none",
              borderRadius: "10px",
              p: "15px 25px",
              mb: "15px",
            }}
          >
            <Box mt={2}>
              <Tabs className="product-details-tabs">
                <TabList>
                  {/* <Tab>
                    {producerformdata.category_type =="Movie" ? "Movie Details" : "Series Details"}
                  </Tab> */}
                  <Tab>Production Details</Tab>
                  <Tab>Person Details</Tab>
                </TabList>

                <TabPanel>
                  <Card
                    sx={{
                      boxShadow: "none",
                      borderRadius: "10px",
                      p: "25px 20px",
                      mb: "10px",
                      backgroundColor: "#F7FAFF",
                    }}
                  >
                    <Typography
                      as="h3"
                      sx={{
                        fontSize: 16,
                        mb: "15px",
                        fontWeight: 500,
                        mt: "-25px",
                        ml: "-25px",
                        mr: "-25px",
                        padding: "10px 25px",
                        borderRadius: "8px 8px 0px 0px",
                        background:
                          "linear-gradient(225deg,  var(--gradientColorLighter1) 0%, var(--gradientColorLighter2) 91.25%)",

                        color: "white !important",
                      }}
                    >
                      Production Details
                    </Typography>

                    <Box>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Production Name:
                        </span>
                        {producerformdata?.production_name?.name}
                      </Typography>

                      {/* {!producerformdata?.category_type =="Movie"  ( */}
                    
                      {/* )} */}
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Producer:
                        </span>
                        {producerformdata?.producer}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Director:
                        </span>
                        {producerformdata?.director}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Cast:
                        </span>
                        {producerformdata?.cast}
                      </Typography>
                    </Box>
                  </Card>
                </TabPanel>
                <TabPanel>
                  <Card
                    sx={{
                      boxShadow: "none",
                      borderRadius: "10px",
                      p: "25px 20px",
                      mb: "10px",
                      backgroundColor: "#F7FAFF",
                    }}
                  >
                    <Typography
                      as="h3"
                      sx={{
                        fontSize: 16,
                        mb: "15px",
                        fontWeight: 500,
                        mt: "-25px",
                        ml: "-25px",
                        mr: "-25px",
                        padding: "10px 25px",
                        borderRadius: "8px 8px 0px 0px",
                        background:
                          "linear-gradient(225deg,  var(--gradientColorLighter1) 0%, var(--gradientColorLighter2) 91.25%)",

                        color: "white !important",
                      }}
                    >
                      Person Details
                    </Typography>

                    <Box>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Contact Person :
                        </span>
                        {producerformdata?.contact_person_name}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Mobile No
                        </span>
                        {producerformdata?.mobileNumber}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          email:
                        </span>
                        {producerformdata?.email}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          GST No:
                        </span>
                        {producerformdata?.GST}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Rights Available:
                        </span>
                        {producerformdata?.rights_available}
                      </Typography>
                    </Box>
                  </Card>
                </TabPanel>
              </Tabs>
            </Box>
          </Card>
        </Grid>

        <Grid item spacing={4} xs={12} sm={12} md={12} lg={12} xl={12}>
          <Card
            sx={{
              boxShadow: "none",
              borderRadius: "10px",
              p: "15px 25px",
              mb: "15px",
            }}
          >
            <Box mt={2}>
              <Tabs className="product-details-tabs">
                <TabList>
                  <Tab>Links</Tab>
                  <Tab>Subtitle Link</Tab>
                  <Tab>Audio Link</Tab>
                </TabList>

                <TabPanel>
                  <Card
                    sx={{
                      boxShadow: "none",
                      borderRadius: "10px",
                      p: "25px 20px",
                      mb: "10px",
                      backgroundColor: "#F7FAFF",
                    }}
                  >
                    <Typography
                      as="h3"
                      sx={{
                        fontSize: 16,
                        fontWeight: 500,
                        mb: "15px",
                        mt: "-25px",
                        ml: "-25px",
                        mr: "-25px",
                        padding: "10px 25px",
                        borderRadius: "8px 8px 0px 0px",
                        background:
                          "linear-gradient(225deg,  var(--gradientColorLighter1) 0%, var(--gradientColorLighter2) 91.25%)",

                        color: "white !important",
                      }}
                    >
                      Links & Content
                    </Typography>

                    <Box>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Trailer Link :
                        </span>
                        {producerformdata?.trailer_link}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          mp4_URL:
                        </span>
                        {producerformdata?.mp4_URL}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Imdb / facebook Url
                        </span>
                        {producerformdata?.imdb_facebook_url}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Sound Format
                        </span>
                        {producerformdata?.sound_format_required}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Country Of Oragin
                        </span>
                        {producerformdata?.country_of_origin}
                      </Typography>
                    </Box>
                  </Card>
                </TabPanel>
                <TabPanel>
                  <Card
                    sx={{
                      boxShadow: "none",
                      borderRadius: "10px",
                      p: "25px 20px",
                      mb: "10px",
                      backgroundColor: "#F7FAFF",
                    }}
                  >
                    <Typography
                      as="h3"
                      sx={{
                        fontSize: 16,
                        fontWeight: 500,
                        mb: "15px",
                        mt: "-25px",
                        ml: "-25px",
                        mr: "-25px",
                        padding: "10px 25px",
                        borderRadius: "8px 8px 0px 0px",
                        background:
                          "linear-gradient(225deg,  var(--gradientColorLighter1) 0%, var(--gradientColorLighter2) 91.25%)",

                        color: "white !important",
                      }}
                    >
                      Subtitle Links
                    </Typography>

                    <Box>
                      {Subtitle_list?.map((sub) => (
                        <Typography
                          sx={{
                            fontSize: 13,
                            mt: "10px",
                            display: "flex",
                          }}
                        >
                          <span
                            style={{
                              width: "150px",
                              fontWeight: "500",
                            }}
                            className="mr-10px"
                          >
                            {sub?.subtitle_language}
                          </span>
                          <a
                            href={sub?.subtitle_file}
                            target="_blank"
                            download="new-file"
                          >
                            {sub?.subtitle_file}
                          </a>
                        </Typography>
                      ))}
                      {/* <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                         mp4_URL:
                        </span>
                        {producerformdata?.mp4_URL}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                        Imdb / facebook Url
                        </span>
                        {producerformdata?.imdb_facebook_url}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Sound Format

                        </span>
                       {producerformdata?.sound_format_required}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                       Country Of Oragin
                        </span>
                       {producerformdata?.country_of_origin}
                      </Typography> */}
                    </Box>
                  </Card>
                </TabPanel>
                <TabPanel>
                  <Card
                    sx={{
                      boxShadow: "none",
                      borderRadius: "10px",
                      p: "25px 20px",
                      mb: "10px",
                      backgroundColor: "#F7FAFF",
                    }}
                  >
                    <Typography
                      as="h3"
                      sx={{
                        fontSize: 16,
                        fontWeight: 500,
                        mb: "15px",
                        mt: "-25px",
                        ml: "-25px",
                        mr: "-25px",
                        padding: "10px 25px",
                        borderRadius: "8px 8px 0px 0px",
                        background:
                          "linear-gradient(225deg,  var(--gradientColorLighter1) 0%, var(--gradientColorLighter2) 91.25%)",

                        color: "white !important",
                      }}
                    >
                      Audio Links
                    </Typography>

                    <Box>
                      {Audio_list?.map((sub) => (
                        <Typography
                          sx={{
                            fontSize: 13,
                            mt: "10px",
                            display: "flex",
                          }}
                        >
                          <span
                            style={{
                              width: "150px",
                              fontWeight: "500",
                            }}
                            className="mr-10px"
                          >
                            {sub?.audio_language}
                          </span>
                          <a
                            href={sub?.audio_file}
                            target="_blank"
                            download="new-file"
                          >
                            {sub?.audio_file}
                          </a>
                        </Typography>
                      ))}
                      {/* <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                         mp4_URL:
                        </span>
                        {producerformdata?.mp4_URL}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                        Imdb / facebook Url
                        </span>
                        {producerformdata?.imdb_facebook_url}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                          Sound Format

                        </span>
                       {producerformdata?.sound_format_required}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          display: "flex",
                        }}
                      >
                        <span
                          style={{
                            width: "150px",
                            fontWeight: "500",
                          }}
                          className="mr-10px"
                        >
                       Country Of Oragin
                        </span>
                       {producerformdata?.country_of_origin}
                      </Typography> */}
                    </Box>
                  </Card>
                </TabPanel>
              </Tabs>
            </Box>
          </Card>
        </Grid>
      </Grid>
      {role != "Producer" &&role != "Distributor" && (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} textAlign="center">
          <Button
            disabled={disBtn}
            style={{
              background:
                "linear-gradient(225deg,  #ac1600 0%, #500303 91.25%)",
            }}
            sx={{
              textTransform: "capitalize",
              borderRadius: "10px",
              mt: "10px",
              p: "10px 30px",
              fontSize: "14px",
              color: "#fff !important",
            }}
            variant="contained"
            className="mr-10px"
            onClick={handleApprove}
          >
            {producerformdata?.status === "Approved" ? "Approved" : "Approve"}
          </Button>
          <Button
            disabled={disBtn}
            style={{
              background:
                "linear-gradient(225deg,  #ac1600 0%, #500303 91.25%)",

              display: producerformdata?.status === "Approved" ? "none" : "",
            }}
            sx={{
              textTransform: "capitalize",
              borderRadius: "10px",
              mt: "10px",
              p: "10px 30px",
              fontSize: "14px",
              color: "#fff !important",
            }}
            variant="contained"
            className="mr-10px"
            onClick={handleReject}
          >
            {producerformdata?.status === "Rejected" ? "Rejected" : "Reject"}
            {/* Reject  */}
          </Button>
        </Grid>
      )}
      <Grid
        item
        xs={12}
        md={12}
        key={"-grid"}
        lg={12}
        display={showRejectBtn ? "block" : "none"}
        sx={{ mt: "1rem" }}
        textAlign="center"
      >
        <TextField
          autoComplete="Reject Reason"
          name="RejectMsg"
          fullWidth
          id="1"
          type="text"
          required="true"
          value={rejectMsg}
          label="Reject Reason"
          // helperText={"yes"}

          // helperText={(((isMulti && errorMessage) || !allowSubmit)
          // 	&& (form?.[value.name] == undefined ||
          // 		form?.[value.name]?.length <= 0) &&
          // 		value?.required) && "Please fill this field" ||
          // 		(value?.endsWith &&
          // 			!(
          // 			  form?.[value.name]?.endsWith(value?.endsWith) ||
          // 			  form?.[value.name]?.endsWith(value?.endsWith1)
          // 			)) &&
          // 		  (value?.errorText || "Incorrect format")}
          // helperText={((isMulti && errorMessage && (form?.[value.name] == undefined || form?.[value.name]?.length <= 0) && value?.required) && "Please fill this field") || (value?.endsWith && (!form?.[value.name]?.endsWith(value?.endsWith) && (value?.errorText || "Incorrect format")))}
          onChange={(event) => {
            setRejectMsg(event.target.value);
          }}
          InputProps={{
            inputProps: {
              maxLength: 250,
            },
          }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end",marginTop:"5px" }}>
          <p style={{ color: "#fff" }}>
            {rejectMsg.length}/{250}
            {rejectMsg.length >= 250 && (
              <span style={{ color: "red" }}>Maximum limit reached</span>
            )}
          </p>
        </div>
        <Button
          disabled={disBtn}
          style={{
            background: "linear-gradient(225deg,  #ac1600 0%, #500303 91.25%)",
          }}
          sx={{
            textTransform: "capitalize",
            borderRadius: "10px",
            mt: "10px",
            p: "10px 30px",
            fontSize: "14px",
            color: "#fff !important",
          }}
          variant="contained"
          className="mr-10px"
          onClick={handleRegMsg}
        >
          {/* {producerformdata?.status !== "Pending" ? "Approved" : "Approve"} */}
          Submit
        </Button>
      </Grid>
    </>
  );
  // return (
  //   <div>fsd</div>
  // )
};

export default FormDetails;
