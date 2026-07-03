import React, { useEffect, useState } from "react";
import { Box, Typography, Card, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { total_subscribe_user } from "../../../actions/dashboard";

const SubscribedUsers = () => {
  const currentYear = new Date().getFullYear();
  const dispatch = useDispatch();
  const [select, setSelect] = useState(currentYear);

  useEffect(() => {
    const data = new FormData();
    data.append("year", currentYear);
    dispatch(total_subscribe_user(data));
  }, [dispatch, currentYear]);

  const handleChange = (event) => {
    const selectedYear = event.target.value;
    setSelect(selectedYear);
    const data = new FormData();
    data.append("year", selectedYear);
    dispatch(total_subscribe_user(data));
  };

  const totalsubscribeuser = useSelector((state) => state.dashboard?.totalsubscribeuser);
  // console.log(totalsubscribeuser?.data  , Array.isArray(totalsubscribeuser?.data) ,totalsubscribeuser ,"Dfdsfsdfsf")
  const validData =
    totalsubscribeuser?.data && Array.isArray(totalsubscribeuser?.data)
      ? totalsubscribeuser?.data
      : [];

  const series = validData.map((ele) =>ele?.data ?? 0); // ensures numbers only
  const labels = validData.map((ele) => ele?.name ?? "Unknown");

  const options = {
    chart: {
      type: "donut",
      toolbar: {
        show: false,
        tools: {
          download: true,
        },
        export: {
          csv: {
            filename: "SubscribedUsers",
            columnDelimiter: ",",
            headerCategory: "Category",
            headerValue: "Users",
          },
        },
      },
    },
    labels: labels,
    colors: ["#fd7524", "#db381e", "#eaac13", "#c45b7f"],
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " Users";
        },
      },
    },
    legend: {
      show: true,
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
  };

  return (
    <Card
      sx={{
        boxShadow:
          "var(--gradientColorLighter2) 0px 6px 12px -2px, var(--gradientColorLighter1) 0px 3px 7px -3px",
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
          borderBottom: "1px solid #EEF0F7",
          paddingBottom: "10px",
          mb: "20px",
        }}
        className="for-dark-bottom-border"
      >
        <Typography sx={{ fontSize: 18, fontWeight: 500 }}>Subscribers : {totalsubscribeuser?.total_users}</Typography>
        <FormControl size="small">
          <InputLabel id="year-select-label">Year</InputLabel>
          <Select
            labelId="year-select-label"
            value={select}
            onChange={handleChange}
            label="Year"
            sx={{ minWidth: 100 }}
          >
            {[...Array(2)].map((_, i) => (
              <MenuItem key={i} value={currentYear + i}>
                {currentYear + i}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Chart options={options}  series={series} type="donut" height={330} />
    </Card>
  );
};

export default SubscribedUsers;
