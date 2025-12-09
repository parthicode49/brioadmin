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
import { movie_details } from "../../../actions/Movie/movie";
import { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE } from "../../../api/index";
import WatchedCustomers from "./WatchedCustomers";
import EnlargedView from "../../utils/EnlargedView";
import dayjs from "dayjs";
import AdInMovie from "./AdInMovie";
const ProductDetailsContent = () => {
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
    if (location.state?.id) dispatch(movie_details({ id: location.state?.id }));
  }, [location.state?.id]);
  const data = useSelector((state) => state.movies.movie?.data);
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
                  <Tab>{"Movie"}</Tab>
                  <Tab>Media </Tab>
                <Tab>Cast </Tab>
                  {data?.ownership == "Content Owner" && (
                    <Tab>Content Owner</Tab>
                  )}
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
                          Category
                        </span>
                        {/* {data?.movie_subcategory} */}
                        {data?.category_name}
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
                          Sub Category
                        </span>
                        {/* {data?.movie_subcategory} */}
                        {data?.subcategory_name?.join()}
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
                          Access:
                        </span>
                        {data?.content_access}
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
                          Ownership:
                        </span>
                        {data?.ownership}
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
                        {dayjs(data?.publish_date).format("DD-MM-YYYY")}{" "}
                        {
                          <span style={{ paddingLeft: "5px" }}>
                            {"(" + data?.publish_time + ")"}
                          </span>
                        }
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
                          Expiry Date:
                        </span>
                        {data?.expiry_date}
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
                          Sequence:
                        </span>
                        {data?.sequence}
                      </Typography> */}
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
                          Content Link:
                        </span>
                        {data?.content_link}
                      </Typography> */}
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
                          Content Trailer Link:
                        </span>
                        {data?.content_trailer_link}
                      </Typography> */}
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
                          Trailer Durations:
                        </span>
                        {data?.trailer_durations}
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
                          Available Platform:
                        </span>
                        {data?.available_for_platform}
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
                          Free Preview :
                        </span>
                        {data?.free_preview_durations}
                      </Typography> */}
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
                          Sequence:
                        </span>
                        {data?.sequence}
                      </Typography>
                    </Box>
                  </Card>
                </TabPanel>
            {   <TabPanel>
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
                        Cast
                      </span>
                    </Typography>

                    <Box>
                      <Card
                        sx={{
                          fontSize: 13,
                          mt: "10px",
                          background: "none",
                          display: "flex",
                          boxShadow: "none",
                          color: "var(--themeColor)",
                        }}
                      >
                        { data?.cast?.length >0 ?
                         data?.cast?.map((ele) => (
                          <Card
                            sx={{
                              fontSize: 13,
                              mt: "10px",
                              background: "none",
                              display: "flex",
                              boxShadow: "none",
                              color: "var(--themeColor)",
                              flexDirection: "column",
                              textAlign: "center",
                              width: "fit-content",
                              ml: "15px",
                            }}
                          >
                            <img
                              src={IMAGE + ele?.cast_image}
                              width="100px"
                              height="100px"
                              style={{
                                borderRadius: "50%",
                                marginBottom: "10px",
                              }}
                            />
                            <p style={{ color: "var(--themeFontColor)" }}>
                              {ele?.cast}
                            </p>
                            <p style={{ color: "var(--themeFontColor)" }}>
                              {ele?.character_name}
                            </p>
                          </Card>
                        )) : <p style={{color: "var(--themeFontColor)"}}>No Cast is added</p> } 
                      </Card>
                    </Box>
                  </Card>
                </TabPanel>}
                {data?.ownership == "Content Owner" && (
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
                            Content Owner :
                          </span>
                          {data?.distributor_name}
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
                            Company Name:
                          </span>
                          {data?.company_name}
                        </Typography>
                        {data?.content_access == "SVOD" && (
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
                              Pay per view:
                            </span>
                            {data?.distributor_commission}
                          </Typography>
                        )}
                        {data?.content_access == "TVOD" && (
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
                              TVOD Commission:
                            </span>
                            {data?.distributor_tvod_commission} %
                          </Typography>
                        )}
                      </Box>
                    </Card>
                  </TabPanel>
                )}
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

        {role !== "Distributor" && (
          <>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {" "}
              <WatchedCustomers id={location.state?.id} path={path} />
              <AdInMovie id={location.state?.id} />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default ProductDetailsContent;
