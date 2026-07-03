import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Features = ({ dashboardcount, role }) => {
  // console.log(dashboardcount?.data?. ,"fjmdsfjdsfjsd")
  const FeaturesData = [
    {
      id: "1",
      subTitle: dashboardcount?.[0]?.["data"],
      title: "Movies",
      link: "/movies",
      backgroundColor: "var(--themeFontColor)",
      access: true,
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

      link: "/series",
      access: true,
    },
    // {
    //   id: "6",
    //   subTitle: dashboardcount?.[2]?.["data"],
    //   title: "Song",
    //   link: "/song",
    //   access: true,
    // },
    // {
    //   id: "6",
    //   subTitle: dashboardcount?.[3]?.["data"],
    //   title: "Content Form",
    //   link: "/contentform",
    //   access: true,
    // },

    //  role!="Distributor"&&{
    //   id: "6",
    //   subTitle: 6,
    //   title: "Reports",
    //   image: Advertisement,
    //   link:"/reports/reports/",
    //  access : true

    // },
    // role!="Producer"&&{
    //   id: "6",
    //   subTitle: 6,
    //   title: "Promotions",
    //   image: Advertisement,
    //   link:"/Promotion/Promotion/"
    // },
  ].filter((e) => e);
  return (
    <>
      <Grid
        container
        justifyContent="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      >
        {FeaturesData.map((feature, index) => (
          <Grid
            item
            xs={10}
            sm={4}
            md={3}
            lg={role != "Producer" ? 3 : 6}
            key={feature.title + index}
          >
            {feature.access && (
              <Link
                to={feature.link}
                state={feature.state}
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    // background: "#000",
                    background:
                      "linear-gradient(225deg, var(--themeColor) 0%,var(--themeColorLightestShade) 91.25%)",
                    borderRadius: "10px",
                    p: "25px 10px",
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
                        sx={{
                          fontSize: 20,
                          fontWeight: 700,
                          textAlign: "center",
                        }}
                      >
                        <span style={{ color: "var(--themeFontColor)" }}>
                          {" "}
                          {feature.title}
                        </span>
                      </Typography>
                      <Typography
                        variant="p"
                        fontSize={16}
                        fontWeight={700}
                        textAlign={"center"}
                        width={"100%"}
                        display={"block"}
                      >
                        <span style={{ color: "#e55e08" }}>
                          {" "}
                          {feature.subTitle}
                        </span>
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Link>
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Features;
