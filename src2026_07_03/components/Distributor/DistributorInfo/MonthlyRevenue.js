import React, { useEffect, useRef, useState } from "react";
import { Box, Card, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import Chart from "react-apexcharts";
import axios from "axios";
import { IMAGE } from "../../../api";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const MonthlyRevenue = ({ id }) => {
    const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const handleChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    // const data = new FormData();
    // data.append("year", year);
    // dispatch(total_user(data));
  };
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Loading...",
        data: new Array(12).fill(0),
      },
    ],
    options: {
      chart: {
        type: "bar",
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (val) => `${val} Subscriptions`,
        },
      },
      xaxis: {
        categories: months,
      },
    },
  });

  useEffect(() => {
    const params = {
      year:selectedYear ,
      distributor_id: id,
    };

    axios
      .post(`${IMAGE}api/distributor_monthly_revenue/`, params)
      .then((response) => {
        if (response.status === 200) {
          const apiData = response.data.data;

          if (!apiData || Object.keys(apiData).length === 0) {
            setChartData((prevData) => ({
              ...prevData,
              series: [
                {
                  name: "No Data",
                  data: new Array(12).fill(0),
                },
              ],
              options: {
                ...prevData.options,
                xaxis: {
                  categories: months,
                },
              },
            }));
            return;
          }

          let seriesMap = {};

          months.forEach((month, monthIndex) => {
            const monthData = apiData[month] || {};
            Object.keys(monthData).forEach((plan) => {
              if (!seriesMap[plan]) {
                seriesMap[plan] = new Array(12).fill(0);
              }
              seriesMap[plan][monthIndex] = monthData[plan];
            });
          });

          const series = Object.keys(seriesMap).map((plan) => ({
            name: plan,
            data: seriesMap[plan],
          }));

          setChartData((prevData) => ({
            ...prevData,
            series,
            options: {
              ...prevData.options,
              xaxis: {
                categories: months,
              },
            },
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setChartData((prevData) => ({
          ...prevData,
          series: [
            {
              name: "Error",
              data: new Array(12).fill(0),
            },
          ],
        }));
      });
  }, [id , selectedYear]);

  return (
    <div>
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
              paddingBottom: "10px",
              color: "white",
            }}
            className="for-dark-bottom-border"
          >
            Monthly Subscription Chart
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

        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </Card>
    </div>
  );
};

export default MonthlyRevenue;
