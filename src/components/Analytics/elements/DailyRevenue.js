import React,{useEffect} from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Chart from "react-apexcharts";
import { daily_revenue } from '../../../actions/dashboard';
import { useDispatch,useSelector } from 'react-redux';

const DailyRevenue = () => {
  const user=useSelector((state) => state.layout.profile)
  const dispatch=useDispatch()
  useEffect(()=>{
    const data=new FormData()
    data.append('id',user?.id)
		dispatch(daily_revenue(data))
    
	},[])
  const dailyrevenue = useSelector((state) => state.dashboard.daily_revenue);
  
  const series = [
    {
      name: "Daily Revenue",
      data:dailyrevenue?.data,
    }
  ];
  const options = {
    plotOptions: {
      radar: {
        size: 100,
        polygons: {
          strokeColors: "var(--themeFontColor)",
          fill: {
            colors: ["var(--themeColor)", "#686565"],
          },
        },
      },
    },
    chart: {
      
      toolbar: {
        show: true,
      },
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1,
      },
    },
    stroke: {
      width: 2,
    },
    colors: ["var(--gradientColor2)",//"#2DB6F5", 
    "var(--gradientColor1)",//"#E289F2"
  ],
    fill: {
      opacity: 0.1,
    },
    markers: {
      size: 5,
    },
  
    xaxis: {
      categories: [
        "Monday",
        "Tuesday",
        "Wendsday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      labels: {
        style: {
          fontSize: '12px',
          fontWeight: 500,
        },
      }
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
      y: {
        formatter: function (val) {
          return  "$"+val;
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
          p: "25px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid var(--themeFontColor)",
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
            Daily Revenue: $ { dailyrevenue?.total_amount_weekly}
          </Typography>

        </Box>

        <Chart options={options} series={series} type="radar" height={400} />
      </Card>
    </>
  );
};

export default DailyRevenue;
