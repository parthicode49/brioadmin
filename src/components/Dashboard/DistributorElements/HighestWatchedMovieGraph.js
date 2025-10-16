import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { distrubutor_most_watched_movie } from "../../../actions/distributor_dashboard";
const HighestWatchedMoviesGraph = () => {
  const user = useSelector((state) => state.layout.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      const data = new FormData();
      data.append("id", user?.id);
      dispatch(distrubutor_most_watched_movie({ id: user?.id }));
    }
  }, [user]);
  const data = useSelector(
    (state) => state?.distributor_dashboard?.most_watch_movie
  );

  // Chart
  const series =
    (data &&
      data?.graph_data?.map((value, index) => ({
        ...value,
        type: ["column", "column"][index],
      }))) ||
    [];

  const options = {
    chart: {
      id: "movie-revenue-chart",
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#DC5F00"],
    xaxis: {
      categories: data?.labels || [],
      labels: {
        // show: false,
      },
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const value = series[seriesIndex][dataPointIndex];
        const label = w.globals.labels[dataPointIndex];
        return `
        <div style="
          padding: 10px;
          background: #FFF1CA !important;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          border-radius: 8px;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 10px;
          font-family: 'Raleway';
        ">
          <strong style="font-size: 20px">${label}</strong>
          <span style="font-family: 'Poppins';">View: ₹${value.toLocaleString()}</span>
        </div>
      `;
      },
    },
  };

  return (
    <>
      <Card
        sx={{
          boxShadow:
            "var(--gradientColorLighter2) 0px 6px 12px -2px, var(--gradientColorLighter1) 0px 3px 7px -3px",
          borderRadius: "10px",
          p: "25px 25px 10px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "10px",
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
            Highest Watched Movies
          </Typography>
        </Box>
        {series.length && options.xaxis.categories.length ? (
          <Chart
            key="movie-revenue-chart"
            options={options}
            series={series}
            type="area"
            height={388}
          />
        ) : (
          <Typography>No revenue data available.</Typography>
        )}
      </Card>
    </>
  );
};

export default HighestWatchedMoviesGraph;
