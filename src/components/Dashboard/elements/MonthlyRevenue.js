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
  const currentYear = new Date().getFullYear();
  const dispatch=useDispatch()
  useEffect(()=>{
		const data=new FormData()
    data.append("year",currentYear)
    data.append('id',user?.id)
    dispatch(monthly_revenue(data))
	},[])
const monthlyrevenue = useSelector((state) => state.dashboard?.monthlyrevenue);
  const [select, setSelect] = React.useState(currentYear);
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
        horizontal: false,
        columnWidth: "20%",
        endingShape: "rounded",
        }
      }, dataLabels: {
       
        formatter: function (val) {
          return val>0?"₹"+val:"";
        },
      },
        chart: {
          type: "polarArea",
           toolbar: {
        show: false}
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
              return  "₹"+val+".00";
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
            Yearly Revenue: ₹ {parseFloat(monthlyrevenue?.Total_yearly_amount).toFixed(2)}
          </Typography>
          <Box>
           <FormControl size="small" sx={{ minWidth: 100 }}>
          <InputLabel id="year-select-label">Year</InputLabel>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={select}
            label="Year"
            onChange={handleChange}
          >
            {[...Array(2)].map((_, i) => {
              const year = currentYear + i;
              return (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
          </Box> </Box>
          <Chart
            options={options}
            series={series}
            type="area"
            height={340} 
          />
        </Card>
      </>
    );
  }


export default MonthlyRevenue
