import React,{useEffect} from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Chart from "react-apexcharts";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { renewal } from '../../../actions/dashboard';
import { useDispatch,useSelector } from 'react-redux';
const Renewal = () => {
  const user=useSelector((state) => state.layout.profile)
  const dispatch=useDispatch()
  useEffect(()=>{
    const data=new FormData()
    data.append("year","2024")
    data.append('id',user?.id)
		dispatch(renewal(data))
    
	},[])
  const renewal_data = useSelector((state) => state.dashboard.renewal?.data);
  const [select, setSelect] = React.useState("2024");
  const handleChange = (event) => {
    
    setSelect(event.target.value);
    const data=new FormData()
    data.append("year",event.target.value)
    data.append('id',user?.id)
    dispatch(renewal(data))
  };
  // Chart
  const series = renewal_data?.map((value,index)=>({...value,type:["area","column","column"][index]}))||[];
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
      colors: ["#e35466","transparent","transparent"],
    },
    colors: ["#e35466",//"#7d76fc",
    "#7f68b5", 
 "#ff87f2"
   ],
   
    xaxis: {
      categories:[
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
      labels: {
        style: {
          colors: "#A9A9C8",
          fontSize: "12px",
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
        formatter: function (val) {
          return  val+" users";
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
           Renewal
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

        <Chart options={options} series={series} type="area" height={285} />
      </Card>
    </>
  );
};

export default Renewal;
