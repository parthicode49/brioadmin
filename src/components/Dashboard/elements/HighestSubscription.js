import React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Chart from "react-apexcharts";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch,useSelector } from 'react-redux';
import { total_subscribe_user } from '../../../actions/dashboard';
import { useEffect } from "react";



const HighestSubscription = () => {
  useEffect(()=>{
		
    const data=new FormData()
    data.append("year","2024")
    dispatch(total_subscribe_user(data))
    
	},[])
  const dispatch=useDispatch()
  const [select, setSelect] = React.useState("2024");
  const handleChange = (event) => {
    setSelect(event.target.value);
    const data=new FormData()
    data.append("year",event.target.value)
    dispatch(total_subscribe_user(data))
  };
  const totalsubscribeuser = useSelector((state) => state.dashboard?.totalsubscribeuser);
const series= totalsubscribeuser?.statuscode=="200"&&totalsubscribeuser?.data.map((ele)=>ele?.data)
const options= {
  
  chart: {
    toolbar: {
      show: true,
      tools: {
        download: true,
      },
      export: {
        csv: {
          filename: undefined,
          columnDelimiter: ',',
          headerCategory: 'category',
          headerValue: 'value',
          dateFormatter(timestamp) {
            return new Date(timestamp).toDateString()
          }
        },
        svg: {
          filename: undefined,
        },
        png: {
          filename: undefined,
        }
      },
      autoSelected: 'zoom' 
    },
},
  labels: totalsubscribeuser?.statuscode=="200"&&totalsubscribeuser?.data.map((ele)=>ele?.name),
  colors: [
  "#2DB6F5", 
  "var(--gradientColor1)",//"#ff87f2"
  "#c45b7f",
  "var(--gradientColor2)",//"#7d76fc", 
],
  tooltip: {
    y: {
      formatter: function (val) {
        return "" + val + "";
      },
    },
  },
  legend: {
    show:true,
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
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid var(--themeFontColor)",
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
            Highest Subscription
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
          </Box>
         
        </Box>

      
        <Chart
          options={options}
          series={series}
          height="400"
          type="pie"
        />

        

        

        

      
      </Card>
    </>
  );
};

export default HighestSubscription;
