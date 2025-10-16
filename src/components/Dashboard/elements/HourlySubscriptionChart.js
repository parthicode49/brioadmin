import React, { useEffect, useState, useRef } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { Box, Card, Typography } from "@mui/material";
import { IMAGE } from "../../../api";

const HourlySubscriptionChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Loading...",
        data: new Array(24).fill(0),
      },
    ],
    options: {
      chart: {
        type: "bar",
        stacked: true,
                   toolbar: {
        show: false}
      },
      tooltip: {
        
        shared: true,
        intersect: false,
        y: {
          formatter: (val) => `${val} Subscriptions`,
        },
        x: {
          formatter: (value, context) => {
            const index = context?.dataPointIndex;
            if (typeof index !== "number" || !Array.isArray(totalSubscriptionsRef.current)) {
              return "0 Total Subscriptions";
            }
            return `${totalSubscriptionsRef.current[index] || 0} Total Subscriptions`;
          },
        },
      },
      xaxis: {
        categories: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`),
      },
    },
  });

  const [totalSubscriptions, setTotalSubscriptions] = useState(new Array(24).fill(0));
  const totalSubscriptionsRef = useRef(new Array(24).fill(0));

  useEffect(() => {
    axios
      .post(`${IMAGE}api/hourly_subscription_chart/`)
      .then((response) => {
        if (response.data.statuscode === 200) {
          const apiData = response.data.hourly_data;

          // If API returns empty object
          if (!apiData || Object.keys(apiData).length === 0) {
            const emptySeries = [
              {
                name: "No Data",
                data: new Array(24).fill(0),
              },
            ];
            setChartData((prevData) => ({
              ...prevData,
              series: emptySeries,
            }));
            setTotalSubscriptions(new Array(24).fill(0));
            totalSubscriptionsRef.current = new Array(24).fill(0);
            return;
          }

          let categories = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);
          let seriesMap = {};
          let totals = new Array(24).fill(0);

          categories.forEach((hour, hourIndex) => {
            if (apiData[hour]) {
              Object.keys(apiData[hour]).forEach((plan) => {
                if (!seriesMap[plan]) {
                  seriesMap[plan] = new Array(24).fill(0);
                }
                seriesMap[plan][hourIndex] = apiData[hour][plan];
                totals[hourIndex] += apiData[hour][plan];
              });
            }
          });

          let series = Object.keys(seriesMap).map((plan) => ({
            name: plan,
            data: seriesMap[plan],
          }));

          setChartData((prevData) => ({
            ...prevData,
            series,
          }));

          setTotalSubscriptions(totals);
          totalSubscriptionsRef.current = totals;
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Optional fallback
        setChartData((prevData) => ({
          ...prevData,
          series: [
            {
              name: "Error",
              data: new Array(24).fill(0),
            },
          ],
        }));
      });
  }, []);

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
            Hourly Subscription Chart
          </Typography>
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

export default HourlySubscriptionChart;
