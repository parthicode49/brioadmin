import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Chart from "react-apexcharts";

import { highest_watched_movies_graph } from "../../../actions/analytics";
import { useDispatch, useSelector } from "react-redux";

import { advertisement_highest_view } from "../../../actions/Advertiser/advertisement";
const AdViewGraph = () => {
  const user = useSelector((state) => state.layout.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.id) {
      dispatch(advertisement_highest_view({ id: user?.id }));
    }
  }, [user]);
  const data = useSelector((state) => state?.advertisers?.ad_list_dashboard);

  const yValues = data?.graph_data[0]?.data || [];
  const xLabels = data?.labels || [];

  const isSingle = yValues.length === 1;
  const isHorizontal = !isSingle && yValues.length < 5;

  const totalView = data?.total_view;

  console.log(data, "safsdfsdf");
  // Chart
  // const series = data?.graph_data?.map((value,index)=>({...value,type:["column","column"][index]}))||[];
  const series = [
    {
      name: "Revenue",
      data: yValues,
    },
  ];
  // const options = {
  //   chart: {
  //     id: "movie-revenue-chart",
  //     type: 'bar',
  //     height: 350,
  //     toolbar: {
  //       show: false,
  //     },
  //   },
  //   plotOptions: {
  //     bar: {
  //       borderRadius: 4,
  //       borderRadiusApplication: 'end',
  //       horizontal: false,
  //     }
  //   },
  //   dataLabels: {
  //     enabled: false
  //   },
  //   colors: ['#DC5F00'],
  //   xaxis: {
  //      categories:data?.labels||[],
  //      labels: {
  //       show: series[0]?.data?.length < 10
  //     }

  //     // labels: {
  //     //   show: false
  //     // }
  //   },
  //   tooltip: {
  //     custom: function ({ series, seriesIndex, dataPointIndex, w }) {
  //       const value = series[seriesIndex][dataPointIndex];
  //       const label = w?.globals?.labels[dataPointIndex];
  //       return `
  //       <div style="
  //         padding: 10px;
  //         background: #FFF1CA !important;
  //         box-shadow: 0 0 10px rgba(0,0,0,0.1);
  //         border-radius: 8px;
  //         text-align: left;
  //         display: flex;
  //         flex-direction: column;
  //         justify-content: center;
  //         align-items: flex-start;
  //         gap: 10px;
  //         font-family: 'Raleway';
  //       ">
  //         <strong style="font-size: 20px">${label}</strong>
  //         <span style="font-family: 'Poppins';">Revenue: $${value.toLocaleString()}</span>
  //       </div>
  //     `;
  //     }
  //   }
  // };

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
        horizontal: isHorizontal,
        ...(isHorizontal
          ? { barHeight: "40%" } // for horizontal bar
          : { columnWidth: isSingle ? "10%" : "70%" }),
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#DC5F00"],
    xaxis: {
      categories: xLabels,
      labels: {
        show: yValues.length < 10,
        style: {
          fontSize: "10px",
          colors: "#5A5A89",
        },
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
<span style="font-family: 'Poppins';">Revenue: $${value.toLocaleString()}</span>
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
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ fontSize: 27, fontWeight: 500 }}>
            Advertisement
          </Typography>
          <Typography sx={{ fontSize: 40, fontWeight: 500 }}>
            Total View {totalView}
          </Typography>
        </Box>
        {series.length && options.xaxis.categories.length ? (
          <Chart
            key="movie-revenue-chart"
            options={options}
            series={series}
            type="bar"
            height={388}
          />
        ) : (
          <Typography>No revenue data available.</Typography>
        )}
      </Card>
    </>
  );
};

export default AdViewGraph;
