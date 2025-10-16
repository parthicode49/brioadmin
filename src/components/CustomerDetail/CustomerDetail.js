import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Features from "./Features";
import PersonalInformation from "./PersonalInformation";

import MyProfiles from "./MyProfiles";
import MySubscriptions from "./MySubscriptions";
import ProfileContent from "./ProfileContent";
import { Link } from "react-router-dom";
import styles from "./../../styles/PageTitle.module.css";
import { customer_details } from "../../actions/customer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function CustomerDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const customer = useSelector((state) => state.customers.customer);

  console.log(customer ,"mnewemnewemwewewmwewewmwew")

  useEffect(() => {
    if (location?.state?.id) {
      dispatch(customer_details({ id: location.state?.id }));
    }
  }, [location]);

  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid item xs={12} md={12} lg={12} xl={4}>
          {/* ProfileContent */}

          <ProfileContent data={customer?.data} img={customer?.data?.avatar} />

          {/* Personal Information */}
          <PersonalInformation
            data={customer?.data}
            
          />
        </Grid>

        <Grid item xs={12} md={12} lg={12} xl={8}>
          {/* Features */}
          <Features data={customer} />

          {/* Profiles */}
          {/* <MyProfiles data={customer?.profile} /> */}
          {/* Subscriptions */}
          <MySubscriptions data={customer?.svod_data} />
        </Grid>
      </Grid>
    </>
  );
}
