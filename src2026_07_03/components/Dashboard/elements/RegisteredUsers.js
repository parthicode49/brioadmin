import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Chart from "react-apexcharts";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";
import { total_user } from "../../../actions/dashboard";
import { useDispatch, useSelector } from "react-redux";
const RegisteredUsers = () => {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();
  useEffect(() => {
    const data = new FormData();
    data.append("year", currentYear);
    dispatch(total_user(data));
  }, []);
  const registeredUsers = useSelector((state) => state.dashboard.totalusers);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const handleChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    const data = new FormData();
    data.append("year", year);
    dispatch(total_user(data));
  };
  const series = registeredUsers?.data || [];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
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
      "#e35466", //"#7d76fc",
      "#7f68b5",
      "#ff87f2",
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
          // colors: "#A9A9C8",
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
          boxShadow:
            "var(--gradientColorLighter2) 0px 6px 12px -2px, var(--gradientColorLighter1) 0px 3px 7px -3px",
          borderRadius: "10px",
          p: "25px 25px 15px",
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
              // borderBottom: "1px solid #EEF0F7",
              paddingBottom: "10px",
              color: "white",
            }}
            className="for-dark-bottom-border"
          >
            Registered Customers : {registeredUsers?.total_user}
          </Typography>
          <Box>
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel id="year-select-label">Year</InputLabel>
              <Select
                labelId="year-select-label"
                id="year-select"
                value={selectedYear}
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

        <Chart options={options} series={series} type="area" height={345} />
      </Card>
    </>
  );
};

export default RegisteredUsers;
