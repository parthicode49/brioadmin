import React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { ComposableMap, Geographies, Geography } from "react-simple-maps"


const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"



const RegionChart = ({}) => {



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
            borderBottom: "1px solid #EEF0F7",
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
            Region Chart : 
          </Typography>

         
        </Box>

      
        <ComposableMap  >
      <Geographies geography={geoUrl} >
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
    </ComposableMap>

        

        

      
      </Card>
    </>
  );
};

export default RegionChart;
