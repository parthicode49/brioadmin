import React,{useEffect} from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Chart from "react-apexcharts";

import { highest_searched_movies_graph } from '../../../actions/analytics';
import { useDispatch,useSelector } from 'react-redux';
const HighestSearchedMovieGraph = () => {

  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(highest_searched_movies_graph())
	},[])
  const data = useSelector((state) => state.analytics.highest_searched_movies_graph);

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
    colors: ["#e35466",//"#7d76fc",
    "#7f68b5", 
 "#ff87f2"
   ],
   
    xaxis: {
      categories:data?.labels||[],
      labels: {
        style: {
          colors: "#A9A9C8",
          fontSize: "10px",
        },
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
           Highest Searched Movies
          </Typography>
       
        </Box>

        <Chart options={options} series={series} type="area" height={285} />
      </Card>
    </>
  );
};

export default HighestSearchedMovieGraph;
