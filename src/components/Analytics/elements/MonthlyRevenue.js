import React, { Component,useEffect } from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Chart from "react-apexcharts";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";
import { monthly_revenue } from '../../../actions/dashboard';
import { useDispatch,useSelector } from 'react-redux';

const MonthlyRevenue = () => {
  const user=useSelector((state) => state.layout.profile)
  const dispatch=useDispatch()
  useEffect(()=>{
		const data=new FormData()
    data.append("year","2024")
    data.append('id',user?.id)
    dispatch(monthly_revenue(data))
	},[])
const monthlyrevenue = useSelector((state) => state.dashboard?.monthlyrevenue);
  const [select, setSelect] = React.useState("2024");
  const handleChange = (event) => {
    setSelect(event.target.value);
    const data=new FormData()
    data.append("year",event.target.value)
    data.append('id',user?.id)
    dispatch(monthly_revenue(data))
  };
 
     const series=  [{name:"Monthly Revenue",data:monthlyrevenue?.monthly_revenue}]
     const  options= {
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      }, dataLabels: {
       
        formatter: function (val) {
          return val>0?"$"+val:"";
        },
      },
        chart: {
          type: "polarArea",
        },
        stroke: {
          colors: ["var(--themeFontColor)"],
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: "horizontal",
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
      
        labels:[
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 600,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
          y: {
            formatter: function (val) {
              return  "$"+val+".00";
            },
          },
        },
      }
 



    return (
      <>
        <Card
          sx={{
            boxShadow: "var(--gradientColorLighter2) 0px 6px 12px -2px, var(--gradientColorLighter1) 0px 3px 7px -3px",
            borderRadius: "10px",
            p: "25px",
            mb: "15px",
          }}
        >  <Box
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
              paddingBottom: "5px",
              mb: "15px",
            }}
            // className="for-dark-bottom-border"
          >
            Yearly Revenue: $ {monthlyrevenue?.Total_yearly_amount}
          </Typography>
          <Box>
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small" sx={{ fontSize: '14px' }}>Select Year</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={select}
                label="Select Year"
                onChange={handleChange} 
                sx={{ fontSize: '14px' }}
              >
                <MenuItem value={2024} sx={{ fontSize: '14px' }}>2024</MenuItem>
                <MenuItem value={2025} sx={{ fontSize: '14px' }}>2025</MenuItem>
              </Select>
            </FormControl>
          </Box> </Box>
          <Chart
            options={options}
            series={series}
            type="area"
            height={500} 
          />
        </Card>
      </>
    );
  }


export default MonthlyRevenue
