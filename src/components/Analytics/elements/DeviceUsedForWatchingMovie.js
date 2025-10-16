import React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Chart from "react-apexcharts";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { device_used_for_watching } from "../../../actions/analytics";
import { useEffect } from "react";

const DeviceUsedForWatchingMovie = () => {
    const dispatch = useDispatch();
    useEffect(() => {
   
    dispatch(device_used_for_watching());
  }, []);

 
  
  const data = useSelector(
    (state) => state.analytics?.device_used_for_watching
  );
  // console.log(data?.graph_data?.[0]?.data ,"New EEEE")
  const series = data?.graph_data?.[0]?.data||[];
  const options = {
    chart: {
      toolbar: {
        show: false,
        tools: {
          download: true,
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ",",
            headerCategory: "category",
            headerValue: "value",
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: undefined,
          },
          png: {
            filename: undefined,
          },
        },
        autoSelected: "zoom",
      },
    },
    labels:
    data?.labels||[],
    colors: [
      "var(--gradientColor2)", //"#7d76fc",
      "#2DB6F5",
      "var(--gradientColor1)", //"#ff87f2"
      "#c45b7f",
    ],
    tooltip: {
      y: {
        formatter: function (val) {
          return "" + val + " Users";
        },
      },
    },
    legend: {
      show: true,
      offsetY: 2,
      position: "bottom",
      horizontalAlign: "center",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <>
      <Card
        sx={{
          boxShadow:
            "var(--gradientColorLighter2) 0px 6px 12px -2px, var(--gradientColorLighter1) 0px 3px 7px -3px",
          borderRadius: "10px",
          p: "25px",
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
            Device Used For Watching Movies
          </Typography>
          
        </Box>

        <Chart options={options} series={series} height="285" type="pie" />
      </Card>
    </>
  );
};

export default DeviceUsedForWatchingMovie;
