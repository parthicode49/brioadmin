import React from "react";
import { useState, useMemo, useEffect } from "react";
import ListTable from "../utils/Table";
import Export from "../utils/Export";
import {
  customer_delete,
  customer_update,
  all_customer_list,
  highest_rented_movie_count,
  highest_plan_buy_count,
} from "./../../actions/customer";
import { all_subscription_list } from "../../actions/subscription";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import notification_icon from "../../images/notification_icon.png"
import PremiumCustomerByPlan from "./PremiumCustomerByPlan";
import PremiumCustomerByRent from "./PremiumCustomerByRent";
import Grid from "@mui/material/Grid";

export default function PremiumCustomer() {
  const dispatch = useDispatch();
  const customers_by_plan = useSelector((state) => state.customers.premium_by_plan);
  const customers_by_rent = useSelector((state) => state.customers.premium_by_rent);

  useEffect(() => {
    dispatch(highest_plan_buy_count());
    dispatch(highest_rented_movie_count());
  }, []);


  return (
    <>
      {/* <Export
        fileName={"Customers"}
        access={rights?.["Customers"]?.["export_excel"] == "true"}
        // exportData={tableData?.exportData || tableData?.tableBody}
        headings={tableData.tableHead.map((value) => value.label)}
      /> */}
       <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
   <Grid item xs={12} md={12} lg={6} xl={6}>
     <PremiumCustomerByPlan data_by_plan={customers_by_plan} />
     </Grid>
     <Grid item xs={12} md={12} lg={6} xl={6}>
     <PremiumCustomerByRent data_by_rent={customers_by_rent}/>
     </Grid>
     </Grid>
    </>
  );
}
