import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

// import poster from "../../../images/poster.jpg";
import "./ProductDetailsContent.css";
import Features from "./Features";
import ProductProfile from "./ProductProfile";
import { episode_details } from "../../../../actions/WebSeries/episode";
import { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE } from "../../../../api/index";
import WatchedCustomers from "./WatchedCustomers";
// import DistributorTransaction from "./DistributorTransaction";
// import ProducerTransaction from "./ProducerTransaction";
import EnlargedView from "../../../utils/EnlargedView";

const EpisodeDetailsContent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const role = useSelector((state) => state.layout.role);
  const path = location.pathname
    .split("/")
    .filter((x) => x)
    .slice(-1);
  const rights = useSelector((state) => state.layout.rights);
  const [contentAccess, setContentAccess] = useState();
  const [openAccess, setOpenAccess] = useState(false);

  // const formData = new FormData();
  // const navigate = useNavigate();
  // formData.append("id", location.state?.id);
  useMemo(() => {
    if (location.state?.id) dispatch(episode_details({ id: location.state?.id }));
  }, [location.state?.id]);
  const data = useSelector((state) => state?.webseries.episode?.data);
  // const cast = useSelector((state) => state.movies.movie?.Cast);
  const distributor = useSelector((state) => state.movies.movie?.Distributor);
  const dataMovie = useSelector((state) => state.movies.movie?.Data);
  const countries = useSelector((state) => state.masters.countries);
  // console.log(dataMovie?.movie_subcategory?.map((ele)=> ele?.subcategory_name))
  // const advertise_list = useSelector((state) =>
  //   path == "MovieDetails"
  //     ? state.movies.movie?.Advertise_list
  //     : state.webseries?.episode?.Advertise_list
  // );
  const Subtitle_list = useSelector(
    (state) => state.movies.movie?.subtitle_list
  );
  const Audio_list = useSelector((state) => state.movies.movie?.audio_file_lis);
  const SubtitleCount = useSelector(
    (state) => state.movies.movie?.subtitle_count
  );
  const AudioCount = useSelector(
    (state) => state?.movies.movie?.audio_file_count
  );
  const earning = useSelector((state) => state.movies.movie);

  const access = data?.movie_access;

  console.log(data, "dfdsfsfdsfsdf");

  return (
    <>
      <Grid
        container
        rowSpacing={1}
        justifyContent="center"
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}
      >
        <EnlargedView
          open={openAccess}
          setOpen={setOpenAccess}
          content={contentAccess}
        />
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={"sdcsdc"}>
          <ProductProfile data={data} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Card
            sx={{
              boxShadow: "var(--themeShadow)",
              borderRadius: "10px",
              p: "15px 25px",
              pb: "8px",
              mb: "15px",
              backgroundColor: "var(--themeColor)",
              minHeight: "355px",
            }}
          >
            <Box mt={2}>
              <Tabs className="product-details-tabs">
                <TabList>
                  <Tab>{"Episode"}</Tab>
                  <Tab>Media </Tab>
                
                  {/* {advertise_list && <Tab>Advertisement</Tab>} */}
                </TabList>

                <TabPanel>
                  <Card
                    sx={{
                      boxShadow: "none",
                      borderRadius: "10px",
                      p: "25px 20px",
                      pb: "0",
                      mb: "10px",
                      backgroundColor: "var(--themeColor)",
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

                        color: "var(--themeColor)",
                      }}
                    >
                      <span style={{ color: "var(--tableHeadFontColor)" }}>
                        Details
                      </span>
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
                          {/* Sub Category: */}
                          Series
                        </span>
                        {/* {data?.movie_subcategory} */}
                        {data?.series_title}
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
                          {/* Sub Category: */}
                          Season Title
                        </span>
                        {/* {data?.movie_subcategory} */}
                        {data?.season_title}
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
                          {/* Sub Category: */}
                          Season Number
                        </span>
                        {/* {data?.movie_subcategory} */}
                        {data?.season_number  }
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
                          Publish Date:
                        </span>
                        {data?.publish_date}
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
                          Publish Time:
                        </span>
                        {data?.publish_time}
                      </Typography>
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
													Watch Hours:
												</span>
												{watch_hours}
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
                      pb: "0",
                      mb: "10px",
                      backgroundColor: "var(--themeColor)",
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

                        color: "var(--themeColor)",
                      }}
                    >
                      <span style={{ color: "var(--tableHeadFontColor)" }}>
                        Details
                      </span>
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
                          Content Link:
                        </span>
                        {data?.content_link}
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
                          Duration:
                        </span>
                        {data?.durations}
                      </Typography>

                    </Box>
                  </Card>
                </TabPanel>

              </Tabs>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={"sdcsdc"}>
          <Features earning={earning} path={path} />
        </Grid>
        {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {data?.movie_access == "TVOD" && path == "MovieDetails" && (
            <p style={{ textAlign: "center", color: "var(--themeFontColor)" }}>
              Above mentioned amount is after deduction of{" "}
              <b>{earning?.tax_percentage}(%)</b> Entertainment Tax. Tax Amount
              is : <b>{earning?.tax_amount} INR </b>
            </p>
          )}
        </Grid> */}

        {/* {location?.state?.isPayment && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={"sdcsdc"}>
            {role !== "Producer" && (
              <DistributorTransaction
                history={earning?.distributor_transaction_history}
                distributor_earning={earning?.distributor_earning}
                distributor_id={earning?.Distributor?.user}
                movie_id={earning?.Data?.id}
                pending_money={earning?.pending_distributor_transaction}
                received_money={earning?.total_received_distributor_transaction}
              />
            )}
            {role !== "Distributor" && (
              <ProducerTransaction
                history={earning?.producer_transaction_history}
                producer_earning={earning?.producer_earning}
                producer_id={earning?.Data?.movie_producer?.user}
                movie_id={earning?.Data?.id}
                pending_money={earning?.pending_producer_transaction}
                received_money={earning?.total_received_producer_transaction}
              />
            )}
          </Grid>
        )} */}
        {!location?.state?.isPayment && (
          <>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {" "}
              <WatchedCustomers id={location.state?.id} path={path} />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default EpisodeDetailsContent;
