import React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import dayjs from "dayjs";


const PersonalInformation = ({data}) => {
  const personalInfo = [
    {
      title: 'Device Type :',
      text: data?.deviceType,
    },
    {
      title: 'Login by :',
      text: data?.socialType || "Mobile",
    },
    {
      title: 'Device Name : ',
      text: data?.deviceId,
    },
    {
      title: 'Registered on : ',
      text: dayjs(data?.created_at).format("DD-MM-YYYY"),
    },
    // {
    //   title: 'Birth Date : ',
    //   text: data?.birthDate,
    // },
    // {
    //   title: 'Last Seen :',
    //   text: data?.lastLoginDate,
    // },
    // {
    //   title: 'Current Plan: ',
    //   text: data?.subscription?.plan_name,
    // },
    // {
    //   title: 'Amount Paid : ',
    //   text: data?.subscription?.price,
    // },
    // {
    //   title: 'Validity : ',
    //   text:data?.subscription&& (data?.subscription?.no_of_days + "Days"),
    // },
  ]
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
            Personal Information
          </Typography>
        </Box>
        
        <Box>
        
          {personalInfo.map((info) => (
            <Box
              sx={{
                display: 'flex',
                borderBottom: '1px solid #F7FAFF',
                p: '10px 0',
              }}
              key={info.title}
              className="for-dark-bottom-border"
            >
              <Typography 
                as='h4' 
                fontWeight='500' 
                fontSize='14px' 
                width='125px'
              >
                {info.title}
              </Typography>

              <Typography>{info.text}</Typography>
            </Box>
          ))}
        </Box>
      </Card>
    </>
  );
};

export default PersonalInformation;
