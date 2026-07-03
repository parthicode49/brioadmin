import React,{useEffect} from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Chart from "react-apexcharts";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { total_revenue } from '../../../actions/dashboard';
import { useDispatch,useSelector } from 'react-redux';

const TotalRevenue = () => {
  const user=useSelector((state) => state.layout.profile)
  const currentYear = new Date().getFullYear();
  const dispatch=useDispatch()
  useEffect(()=>{
    const data=new FormData()
    data.append("year",currentYear)
    data.append('id',user?.id)
		dispatch(total_revenue(data))
    
	},[])
  const totalrevenue = useSelector((state) => state.dashboard.totalrevenue);
  const [select, setSelect] = React.useState(currentYear);
  const handleChange = (event) => {
    setSelect(event.target.value);
    const data=new FormData()
    data.append("year",event.target.value)
    data.append('id',user?.id)
		dispatch(total_revenue(data))
  };
  // Chart
  const series = [
    {
      name: "TVOD Revenue",
      data: totalrevenue?.monthly_revenue||[],
    },
  
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    colors:["var(--gradientColor2)",//"#757FEF",
     "#2DB6F5", 
     "var(--gradientColor1)",//"#EE368C", 
     "#00B69B"
    ],
    xaxis: {
      categories: [
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
           TVOD Revenue : $ {parseFloat(totalrevenue?.TVOD_revenue).toFixed(2)}
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
          </Box>
        </Box>

        <Chart options={options} series={series} type="line" height={345} />
      </Card>
    </>
  );
};

export default TotalRevenue;
