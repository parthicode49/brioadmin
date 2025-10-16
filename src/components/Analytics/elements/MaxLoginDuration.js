import React,{useEffect} from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Chart from "react-apexcharts";
import { max_login_duration } from '../../../actions/dashboard';
import { useDispatch,useSelector } from 'react-redux';
const RegisteredUsers = () => {
  
  const dispatch=useDispatch()
  useEffect(()=>{
    
		dispatch(max_login_duration())
    
	},[])
  const maxloginduration = useSelector((state) => state.dashboard.max_login_duration);

  const series = [
    {
      name: "Loged In",
      data: maxloginduration?.data,
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
        horizontal: false,
        columnWidth: "50%",
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
    
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: "vertical",
            shadeIntensity: 0.5,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 100],
            colorStops: [
              {
                offset: 0,
                color: "var(--gradientColor2)",//"#757FEF",
                opacity: 1
              },
              {
                offset: 100,
                color: "var(--gradientColor1)",//"#ff87f2",
                opacity: 1
              }
            ]
          }
        },
    xaxis: {
      categories: [
        "12 am - 3 am",
        "3 am - 6 am",
        "6 am - 9 am",
        "9 am - 12 am",
        "12 pm - 3 pm",
        "3 pm - 6 pm",
        "6 pm - 9 pm",
        "9 pm - 12 pm",
      ],
      labels: {
        style: {
          colors: "#A9A9C8",
          fontSize: "12px",
        },
      },
    },
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
      >
        <Typography
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "10px",
            color:"black"
          }}
          className="for-dark-bottom-border"
        >
          Max Login Duration
        </Typography>

        <Chart options={options} series={series} type="bar" height={328} />
      </Card>
    </>
  );
};

export default RegisteredUsers;
