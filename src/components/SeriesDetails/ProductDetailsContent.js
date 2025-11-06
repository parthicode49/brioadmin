import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import poster from "./../../images/poster.jpg";
import "./ProductDetailsContent.css";
import Features from "./Features";
import ProductProfile from "./ProductProfile";
import { movie_details } from "./../../actions/Movie/movie";
import { episode_details } from "./../../actions/WebSeries/episode";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE } from "./../../api/index";
import WatchedCustomers from "./WatchedCustomers";
import { Button } from "@mui/material";
import { series_details_admin } from "../../actions/WebSeries/series";
import dayjs from "dayjs";
const ProductDetailsContent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const role = useSelector((state) => state.layout.role);
  // const path = location.pathname.split("/").filter((x) => x)[1];

  const rights = useSelector((state) => state.layout.rights);
  console.log(location, "gdfgdgd");
  useMemo(() => {
    if (location.state?.id) {
      dispatch(series_details_admin({ id: location.state?.id }));
    }
  }, [location.state?.id]);
  const data = useSelector((state) => state?.webseries?.series_detail?.data);
  const data1 = useSelector(
    (state) => state?.webseries?.series_detail?.data?.season_data[0]
  );
  const data2 = useSelector(
    (state) => state?.webseries?.series_detail?.data?.season_data[1]
  );
  const data3 = useSelector(
    (state) => state?.webseries?.series_detail?.data?.season_data[2]
  );
  const data4 = useSelector(
    (state) => state?.webseries?.series_detail?.data?.season_data[3]
  );
  const data5 = useSelector(
    (state) => state?.webseries?.series_detail?.data?.season_data[4]
  );
  const data6 = useSelector(
    (state) => state?.webseries?.series_detail?.data?.season_data[5]
  );
  const data7 = useSelector(
    (state) => state?.webseries?.series_detail?.data?.season_data[6]
  );
  const data8 = useSelector(
    (state) => state?.webseries?.series_detail?.data?.season_data[7]
  );
  const data9 = useSelector(
    (state) => state?.webseries?.series_detail?.data?.season_data[8]
  );
  const data10 = useSelector(
    (state) => state?.webseries?.series_detail?.data?.season_data[9]
  );
  const country_price_list = useSelector(
    (state) => state?.webseries?.series_detail?.price_by_country
  );

  const earning = useSelector((state) => state.webseries?.episode);
  // const earning1 =useSelector((state) =>state)

  // const access =
  //   path == "MovieDetails"
  //     ? data?.movie_access
  //     : data?.series_name?.series_type;

  const handleEdit = () => {
    if (rights?.["Web Series"]?.["edit"] == "true") {
      navigate("/Series/EditSeries/", {
        state: {
          view: "create_new",
          isEdit: true,
          form: JSON.stringify({
            ...data,
            // language: data?.language?.language_name,
            // genre: data?.genre?.map((value) => value?.genre_title),
            // series_distributor: data?.series_distributor?.name,
            // series_subcategory : data?.series_subcategory?.map((value)=>value?.subcategory_name),
            // uploaded_by: data?.created_by?.firstName,
            // series_category : data?.series_category?.category_name,
            // company_name: data?.series_distributor?.company_name,
            // content_advisory : data?.content_advisory?.content_advisory
          }),
        },
      });
    }
  };

  return (
    <>
      <Grid
        container
        rowSpacing={1}
        justifyContent="center"
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}
      >
        <Grid item xs={12} sm={12} md={6} lg={5} xl={5} key={"sdcsdc"}>
          <ProductProfile data={data} />

        </Grid>

        <Grid item spacing={4} xs={12} sm={12} md={6} lg={7} xl={7}>
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
                  <Tab>Series</Tab>
                  <Tab>Cast </Tab>
                  {data?.ownership == "Content Owner" && <Tab>Content Owner</Tab>}
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

                        color: "black",
                      }}
                    >
                      <span style={{ color: "white" }}>Series Details</span>
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
                        
                        { dayjs(data?.publish_date).format("DD-MM-YYYY")   } {<span style={{paddingLeft:"5px"}}>{ "("+ data?.publish_time + ")"}</span>}
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
                        {  
                          data?.cast?.length >0 ?
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
                        )) :  <p style={{color: "var(--themeFontColor)"}}>No Cast is added</p>  }
                      </Card>
                    </Box>
                  </Card>
                </TabPanel>
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
                        mb: "15px",
                        fontWeight: 500,
                        mt: "-25px",
                        ml: "-25px",
                        mr: "-25px",
                        padding: "10px 25px",
                        borderRadius: "8px 8px 0px 0px",
                        background:
                          "linear-gradient(225deg,  var(--gradientColorLighter1) 0%, var(--gradientColorLighter2) 91.25%)",

                        color: "black",
                      }}
                    >
                      <span style={{ color: "#fff" }}>Country wise Price List</span>
                    </Typography>

                    <Box>
                      {country_price_list?.map((data) => (
                        <Typography
                          sx={{
                            fontSize: 13,
                            mt: "10px",
                            display: "flex",
                            //   justifyContent: "space-between",
                          }}
                        >
                          <Typography>
                            <p
                              style={{
                                width: "250px",
                                fontWeight: "500",
                              }}
                              className="mr-10px"
                            >
                              Country:
                              <span
                                style={{
                                  paddingLeft: "5px",

                                  fontWeight: "normal",
                                }}
                                // className="mr-10px"
                              >
                                {data?.country}
                              </span>
                            </p>
                          </Typography>
                          <Typography>
                            <p
                              style={{
                                //  width: "150px",
                                fontWeight: "500",
                              }}
                              className="mr-10px"
                            >
                              Rental Price:
                              <span
                                style={{
                                  marginRight: "20px",
                                  paddingLeft: "5px",

                                  fontWeight: "normal",
                                }}
                              >
												  {data?.rental_price}
                                
                              
                              </span>
                            </p>
                          </Typography>
                        </Typography>
                      ))}
                    </Box>
                  </Card>
                </TabPanel> */}
              </Tabs>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={"sdcsdc"}>
          <Features data={data}/>
        </Grid>
        {data1 && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
                    {data1 && <Tab>{data1?.season_title}</Tab>}
                    {data2 && <Tab>{data2?.season_title}</Tab>}
                    {data3 && <Tab>{data3?.season_title}</Tab>}
                    {data4 && <Tab>{data4?.season_title}</Tab>}
                    {data5 && <Tab>{data5?.season_title}</Tab>}
                    {data6 && <Tab>{data6?.season_title}</Tab>}
                    {data7 && <Tab>{data7?.season_title}</Tab>}
                    {data8 && <Tab>{data8?.season_title}</Tab>}
                    {data9 && <Tab>{data9?.season_title}</Tab>}
                    {data10 && <Tab>{data10?.season_title}</Tab>}

                    {/* <Tab>Cast </Tab> */}
                  </TabList>

                  {data1 && (
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

                            color: "black",
                          }}
                        >
                          <span style={{ color: "white" }}>Season Details</span>
                        </Typography>

                        <Box>
                          {data1?.episodes?.map((episode) => (
                            <Typography
                              sx={{
                                fontSize: 13,
                                mt: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography>
                                <p
                                  style={{
                                    width: "400px",
                                    fontWeight: "500",
                                  }}
                                  //  className="mr-10px"
                                >
                                  Episode Title:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.title}
                                  </span>
                                </p>
                              </Typography>
                              <Typography>
                                <p
                                  style={{
                                    //  width: "150px",
                                    fontWeight: "500",
                                  }}
                                  className="mr-10px"
                                >
                                  Episode status:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.status}
                                  </span>
                                </p>
                              </Typography>
                              <Typography>
                                <p
                                  style={{
                                    //  width: "150px",
                                    fontWeight: "500",
                                  }}
                                  className="mr-10px"
                                >
                                  Episode Duration:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.durations}
                                  </span>
                                </p>
                              </Typography>
                            </Typography>
                          ))}
                        </Box>
                      </Card>
                    </TabPanel>
                  )}
                  {data2 && (
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

                            color: "black",
                          }}
                        >
                          <span style={{ color: "white" }}>Series Details</span>
                        </Typography>

                        <Box>
                          {data2?.data?.map((episode, index) => (
                            <Typography
                              sx={{
                                fontSize: 13,
                                mt: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography>
                                <p
                                  style={{
                                    width: "400px",
                                    fontWeight: "500",
                                  }}
                                  //  className="mr-10px"
                                >
                                  Episode Title:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.episode_title}
                                  </span>
                                </p>
                              </Typography>
                              <Typography>
                                <p
                                  style={{
                                    //  width: "150px",
                                    fontWeight: "500",
                                  }}
                                  className="mr-10px"
                                >
                                  Episode status:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.status}
                                  </span>
                                </p>
                              </Typography>
                              <Typography>
                                <p
                                  style={{
                                    //  width: "150px",
                                    fontWeight: "500",
                                  }}
                                  className="mr-10px"
                                >
                                  Episode Duration:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.episode_duration}
                                  </span>
                                </p>
                              </Typography>
                            </Typography>
                          ))}
                        </Box>
                      </Card>
                    </TabPanel>
                  )}
                  {data3 && (
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

                            color: "#fff",
                          }}
                        >
                          <span style={{ color: "white" }}>Series Details</span>
                        </Typography>

                        <Box>
                          {data3?.data?.map((episode, index) => (
                            <Typography
                              sx={{
                                fontSize: 13,
                                mt: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography>
                                <p
                                  style={{
                                    width: "400px",
                                    fontWeight: "500",
                                  }}
                                  //  className="mr-10px"
                                >
                                  Episode Title:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.episode_title}
                                  </span>
                                </p>
                              </Typography>
                              <Typography>
                                <p
                                  style={{
                                    //  width: "150px",
                                    fontWeight: "500",
                                  }}
                                  className="mr-10px"
                                >
                                  Episode status:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.status}
                                  </span>
                                </p>
                              </Typography>
                              <Typography>
                                <p
                                  style={{
                                    //  width: "150px",
                                    fontWeight: "500",
                                  }}
                                  className="mr-10px"
                                >
                                  Episode Duration:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.episode_duration}
                                  </span>
                                </p>
                              </Typography>
                            </Typography>
                          ))}
                        </Box>
                      </Card>
                    </TabPanel>
                  )}
                  {data4 && (
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

                            color: "#fff",
                          }}
                        >
                          <span style={{ color: "white" }}>Series Details</span>
                        </Typography>

                        <Box>
                          {data4?.data?.map((episode, index) => (
                            <Typography
                              sx={{
                                fontSize: 13,
                                mt: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography>
                                <p
                                  style={{
                                    width: "400px",
                                    fontWeight: "500",
                                  }}
                                  //  className="mr-10px"
                                >
                                  Episode Title:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.episode_title}
                                  </span>
                                </p>
                              </Typography>
                              <Typography>
                                <p
                                  style={{
                                    //  width: "150px",
                                    fontWeight: "500",
                                  }}
                                  className="mr-10px"
                                >
                                  Episode status:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.status}
                                  </span>
                                </p>
                              </Typography>
                              <Typography>
                                <p
                                  style={{
                                    //  width: "150px",
                                    fontWeight: "500",
                                  }}
                                  className="mr-10px"
                                >
                                  Episode Duration:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.episode_duration}
                                  </span>
                                </p>
                              </Typography>
                            </Typography>
                          ))}
                        </Box>
                      </Card>
                    </TabPanel>
                  )}
                  {data5 && (
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

                            color: "#fff",
                          }}
                        >
                          <span style={{ color: "white" }}>Series Details</span>
                        </Typography>

                        <Box>
                          {data5?.data?.map((episode, index) => (
                            <Typography
                              sx={{
                                fontSize: 13,
                                mt: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography>
                                <p
                                  style={{
                                    width: "400px",
                                    fontWeight: "500",
                                  }}
                                  //  className="mr-10px"
                                >
                                  Episode Title:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.episode_title}
                                  </span>
                                </p>
                              </Typography>
                              <Typography>
                                <p
                                  style={{
                                    //  width: "150px",
                                    fontWeight: "500",
                                  }}
                                  className="mr-10px"
                                >
                                  Episode status:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.status}
                                  </span>
                                </p>
                              </Typography>
                              <Typography>
                                <p
                                  style={{
                                    //  width: "150px",
                                    fontWeight: "500",
                                  }}
                                  className="mr-10px"
                                >
                                  Episode Duration:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.episode_duration}
                                  </span>
                                </p>
                              </Typography>
                            </Typography>
                          ))}
                        </Box>
                      </Card>
                    </TabPanel>
                  )}
                  {data6 && (
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

                            color: "#fff",
                          }}
                        >
                          <span style={{ color: "white" }}>Series Details</span>
                        </Typography>

                        <Box>
                          {data6?.data?.map((episode, index) => (
                            <Typography
                              sx={{
                                fontSize: 13,
                                mt: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography>
                                <p
                                  style={{
                                    width: "400px",
                                    fontWeight: "500",
                                  }}
                                  //  className="mr-10px"
                                >
                                  Episode Title:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.episode_title}
                                  </span>
                                </p>
                              </Typography>
                              <Typography>
                                <p
                                  style={{
                                    //  width: "150px",
                                    fontWeight: "500",
                                  }}
                                  className="mr-10px"
                                >
                                  Episode status:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.status}
                                  </span>
                                </p>
                              </Typography>
                              <Typography>
                                <p
                                  style={{
                                    //  width: "150px",
                                    fontWeight: "500",
                                  }}
                                  className="mr-10px"
                                >
                                  Episode Duration:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.episode_duration}
                                  </span>
                                </p>
                              </Typography>
                            </Typography>
                          ))}
                        </Box>
                      </Card>
                    </TabPanel>
                  )}
                  {data7 && (
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

                            color: "#fff",
                          }}
                        >
                          <span style={{ color: "white" }}>Series Details</span>
                        </Typography>

                        <Box>
                          {data7?.data?.map((episode, index) => (
                            <Typography
                              sx={{
                                fontSize: 13,
                                mt: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography>
                                <p
                                  style={{
                                    width: "400px",
                                    fontWeight: "500",
                                  }}
                                  //  className="mr-10px"
                                >
                                  Episode Title:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.episode_title}
                                  </span>
                                </p>
                              </Typography>
                              <Typography>
                                <p
                                  style={{
                                    //  width: "150px",
                                    fontWeight: "500",
                                  }}
                                  className="mr-10px"
                                >
                                  Episode status:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.status}
                                  </span>
                                </p>
                              </Typography>
                              <Typography>
                                <p
                                  style={{
                                    //  width: "150px",
                                    fontWeight: "500",
                                  }}
                                  className="mr-10px"
                                >
                                  Episode Duration:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.episode_duration}
                                  </span>
                                </p>
                              </Typography>
                            </Typography>
                          ))}
                        </Box>
                      </Card>
                    </TabPanel>
                  )}
                  {data8 && (
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

                            color: "#fff",
                          }}
                        >
                          <span style={{ color: "white" }}>Series Details</span>
                        </Typography>

                        <Box>
                          {data8?.data?.map((episode, index) => (
                            <Typography
                              sx={{
                                fontSize: 13,
                                mt: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography>
                                <p
                                  style={{
                                    width: "400px",
                                    fontWeight: "500",
                                  }}
                                  //  className="mr-10px"
                                >
                                  Episode Title:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.episode_title}
                                  </span>
                                </p>
                              </Typography>
                              <Typography>
                                <p
                                  style={{
                                    //  width: "150px",
                                    fontWeight: "500",
                                  }}
                                  className="mr-10px"
                                >
                                  Episode status:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.status}
                                  </span>
                                </p>
                              </Typography>
                              <Typography>
                                <p
                                  style={{
                                    //  width: "150px",
                                    fontWeight: "500",
                                  }}
                                  className="mr-10px"
                                >
                                  Episode Duration:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.episode_duration}
                                  </span>
                                </p>
                              </Typography>
                            </Typography>
                          ))}
                        </Box>
                      </Card>
                    </TabPanel>
                  )}
                  {data9 && (
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

                            color: "#fff",
                          }}
                        >
                          <span style={{ color: "white" }}>Series Details</span>
                        </Typography>

                        <Box>
                          {data9?.data?.map((episode, index) => (
                            <Typography
                              sx={{
                                fontSize: 13,
                                mt: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography>
                                <p
                                  style={{
                                    width: "400px",
                                    fontWeight: "500",
                                  }}
                                  //  className="mr-10px"
                                >
                                  Episode Title:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.episode_title}
                                  </span>
                                </p>
                              </Typography>
                              <Typography>
                                <p
                                  style={{
                                    //  width: "150px",
                                    fontWeight: "500",
                                  }}
                                  className="mr-10px"
                                >
                                  Episode status:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.status}
                                  </span>
                                </p>
                              </Typography>
                              <Typography>
                                <p
                                  style={{
                                    //  width: "150px",
                                    fontWeight: "500",
                                  }}
                                  className="mr-10px"
                                >
                                  Episode Duration:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.episode_duration}
                                  </span>
                                </p>
                              </Typography>
                            </Typography>
                          ))}
                        </Box>
                      </Card>
                    </TabPanel>
                  )}
                  {data10 && (
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

                            color: "#fff",
                          }}
                        >
                          <span style={{ color: "white" }}>Series Details</span>
                        </Typography>

                        <Box>
                          {data10?.data?.map((episode, index) => (
                            <Typography
                              sx={{
                                fontSize: 13,
                                mt: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography>
                                <p
                                  style={{
                                    width: "400px",
                                    fontWeight: "500",
                                  }}
                                  //  className="mr-10px"
                                >
                                  Episode Title:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {episode?.episode_title}
                                  </span>
                                </p>
                              </Typography>
                              <Typography>
                                <p
                                  style={{
                                    //  width: "150px",
                                    fontWeight: "500",
                                  }}
                                  className="mr-10px"
                                >
                                  Episode status:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.status}
                                  </span>
                                </p>
                              </Typography>
                              <Typography>
                                <p
                                  style={{
                                    //  width: "150px",
                                    fontWeight: "500",
                                  }}
                                  className="mr-10px"
                                >
                                  Episode Duration:
                                  <span
                                    style={{
                                      marginRight: "20px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {" "}
                                    {episode?.episode_duration}
                                  </span>
                                </p>
                              </Typography>
                            </Typography>
                          ))}
                        </Box>
                      </Card>
                    </TabPanel>
                  )}
                </Tabs>
              </Box>
            </Card>
          </Grid>
        )}
      </Grid>
      {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} textAlign="center">
        {role !== "Content Owner" &&
          role !== "Advertiser" &&
          role !== "Producer" && (
            <Button
              // disabled={disBtn}
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
                color: "var(--tableHeadFontColor) !important",
              }}
              variant="contained"
              className="mr-10px"
              onClick={handleEdit}
            >
              update
            </Button>
          )}
      </Grid> */}
      {/* {role != "Producer" && (
        <WatchedCustomers id={location.state?.id} path={path} />
      )} */}
    </>
  );
};

export default ProductDetailsContent;
