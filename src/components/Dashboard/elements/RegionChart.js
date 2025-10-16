import React, { useState,useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { VectorMap } from "react-jvectormap";
import { region_chart } from '../../../actions/dashboard';
import { useDispatch,useSelector } from 'react-redux';
const RegionChart = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(region_chart())
	},[])
  const data = useSelector((state) => state.dashboard.region_chart);
  const map = data?.map_data||[];

  const getdata = (key) => {
    const countryData = {};
    map.forEach(function (obj) {
      countryData[obj.code] = obj.value;
    });
    return countryData[key];
  };

  const [hoveredRegion, setHoveredRegion] = useState(null);

  const handleRegionHover = (event,el, code) => {
    // setHoveredRegion({ code, value: getdata(code) });
    el.html(el.html() + ` <br> ${data?.label}: ${getdata(code)}`)
  };

 
  return (
    <>
      <Card
        sx={{
          boxShadow:
            "var(--gradientColorLighter2) 0px 6px 12px -2px, var(--gradientColorLighter1) 0px 3px 7px -3px",
          borderRadius: "10px",
          p: "25px 25px 10px",
          mb: "15px"
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "10px"
          }}
          className="for-dark-bottom-border"
        >
          <Typography as="h3" sx={{ fontSize: 18, fontWeight: 500 }}>
            Region Chart
          </Typography>
        </Box>
        <VectorMap
          map={data?.map_type||"in_mill"}
          backgroundColor="transparent"
          width="100%"
          height="400px"
          focusOn={{
            x: 0.5,
            y: 0.5,
            scale: 0,
            animate: false
          }}
          zoomOnScroll={true}
          onRegionTipShow={(event, el, code) => handleRegionHover(event,el, code)}
          // onRegionTipHide={handleRegionOut}
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: "#e4e4e4",
              "fill-opacity": 0.9,
              stroke: "none",
              "stroke-width": 0,
              "stroke-opacity": 0
            },
            hover: {
              "fill-opacity": 0.8,
              cursor: "pointer"
            },
            selected: {
              fill: "#2938bc"
            }
          }}
          regionsSelectable={false}
          series={{
            regions: [
              {
                values: map.reduce((acc, obj) => {
                  acc[obj.code] = obj.value;
                  return acc;
                }, {}),
                scale: ["#C8EEFF", "#0071A4"],
                normalizeFunction: "polynomial"
              }
            ]
          }}
        />
      </Card>
   
    </>
  );
};

export default RegionChart;