import React,{useEffect} from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Chart from "react-apexcharts";

import { lowest_watched_movies } from '../../../../actions/analytics';
import { useDispatch,useSelector } from 'react-redux';
const LowestWatchedMovieGraph = () => {
  const user=useSelector((state) => state.layout.profile)
  const dispatch=useDispatch()
  useEffect(()=>{
    if(user){

      const data = new FormData();
      data.append("id", user?.id);
      dispatch(lowest_watched_movies(data))
      // dispatch(user_watch_count_graph(data))
    }
  },[user])
  const data = useSelector((state) => state.analytics.lowest_watched_movies);

  // Chart
  const series = data?.graph_data?.map((value,index)=>({...value,type:["column","column"][index]}))||[];
  const options = {
    
    chart: {
      toolbar: {
        show: false,
      },
    },markers: {
      size: 5, // Adjust the size of the dot
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        endingShape: "rounded",
        borderRadius: "4",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      dashArray: 5,
      colors: ["transparent","transparent"],
    },
  colors: ["#DC5F00"],
   
    xaxis: {
      categories:data?.labels||[],
      labels: {
        style: {
          colors: "#A9A9C8",
          fontSize: "11.5px",
          transform: "rotate(20deg)",

        },
        offsetY: -5, // Adjust the vertical position if needed
      },
    },
    
    grid: {
      show: true,
      borderColor: "#f6f6f7",
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
      y: {
        formatter: function (val,b) {
          return  val;
        },
      },
    },
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "var(--gradientColorLighter2) 0px 6px 12px -2px, var(--gradientColorLighter1) 0px 3px 7px -3px",
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
           Lowest Watched Movies
          </Typography>
       
        </Box>

        <Chart options={options} series={series} type="area" height={388} />
      </Card>
    </>
  );
};

export default LowestWatchedMovieGraph;
