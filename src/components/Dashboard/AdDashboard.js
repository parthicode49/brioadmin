import { Grid } from "@mui/material";
import React, { Suspense, useEffect } from "react";
import HighestWatchedMoviesGraph from "./DistributorElements/HighestWatchedMovieGraph";
import HighestWatchedSeriesGraph from "./DistributorElements/HighestWatchedSeriesGraph";
import MovieRevenueGraph from "./DistributorElements/MovieRevenueGraph";
import SeriesRevenueGraph from "./DistributorElements/SeriesRevenueGraph";
import SongRevenueGraph from "./DistributorElements/SongRevenueGraph";
import HighestWatchedSongGraph from "./DistributorElements/HighestWatchedSongGraph";
import Features from "./DistributorElements/Features";
import { useDispatch, useSelector } from "react-redux";
import { distributor_dashboard_count } from "../../actions/distributor_dashboard";

const AdDashboard = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state?.layout?.profile);
  useEffect(()=>{
    if(user?.id){
      dispatch(distributor_dashboard_count({ id: user?.id }));
    }
  },[user])
  const dashboard_count = useSelector((state) => state?.distributor_dashboard?.dashboard_count)
  console.log(dashboard_count ,"ndndddd")

  return (
    <Suspense>
      <>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <MovieRevenueGraph />
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Features dashboardcount={dashboard_count?.data} />
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <SeriesRevenueGraph />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={6} xl={6}>
            <SongRevenueGraph />
          </Grid> */}
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <HighestWatchedMoviesGraph />
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <HighestWatchedSeriesGraph />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4} xl={4}>
            <HighestWatchedSongGraph />
          </Grid> */}
        </Grid>
      </>
    </Suspense>
  );
};

export default AdDashboard;
