import React,{useEffect} from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Chart from "react-apexcharts";
import { Box } from "@mui/material";
import { total_user } from '../../../actions/dashboard';
import { useDispatch,useSelector } from 'react-redux';
const UsersByState = () => {
  const dispatch=useDispatch()
 


  const series =  [
    {
      name: 'Users',
      data: [
        {
          x: 'Karnataka',
          y: 12,
     
        },
        {
          x: 'Gujarat',
          y: 44,
       
        },
        {
          x: 'Maharastra',
          y: 54,
       
        },
        {
          x: 'Tamil Nadu',
          y: 66,
      
        },
        {
          x: 'Kerala',
          y: 81,
      
        },
        {
          x: 'Goa',
          y: 67,
         
        }
      ]
    }
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "20%",
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
      colors: ["transparent"],
    },
    colors: [
     "#7f68b5", 
  "#ff87f2"
    ],

    yaxis: {
      labels: {
        style: {
          colors: "#A9A9C8",
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
        colors: "#f6f6f7",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      
      y: {
        formatter: function (val) {
          return val + " Users";
        },
      },
    },
    legend: {
      offsetY: 12,
      position: "top",
      horizontalAlign: "right",
    },
    grid: {
      show: true,
      borderColor: "#f6f6f7",
    },
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "var(--gradientColorLighter2) 0px 6px 12px -2px, var(--gradientColorLighter1) 0px 3px 7px -3px",
          borderRadius: "10px",
          p: "25px 25px 15px",
          mb: "15px",
         
          
        }}
      ><Box
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
            // borderBottom: "1px solid #EEF0F7",
            paddingBottom: "10px",
            color:"white"
          }}
          className="for-dark-bottom-border"
        >
           No of Logged in Users by State
        </Typography>
       </Box>

        <Chart options={options} series={series} type="bar" height={328} />
      </Card>
    </>
  );
};

export default UsersByState;
