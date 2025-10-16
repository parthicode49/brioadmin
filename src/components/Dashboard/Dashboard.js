import React, { useEffect, useMemo, Suspense } from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import styles from "../../styles/PageTitle.module.css";
import {
  movies_data_dashboard,
  count_on_dashboard,
  total_subscribe_user,
  most_watch_tv_show_dashboard,
  recent_subscriber_dashboard,
  highest_movie_transaction_count,
  most_watched_movie,
} from "../../actions/dashboard";
import { useDispatch, useSelector } from "react-redux";
import ProfileIncompleteErr from "./elements/ProfileIncompleteErr";
import HighestWatchedMoviesGraph from "./elements/HighestWatchedMovieGraph";
import HourlySubscriptionChart from "./elements/HourlySubscriptionChart";
// import { bank_detail_list } from "../../actions/bankdetails";
import Features from "./elements/Features";
import MaxLoginDuration from './elements/MaxLoginDuration'
import RegisteredUsers from "./elements/RegisteredUsers";
import DailyRevenue from "./elements/DailyRevenue";
import TotalRevenue from "./elements/TotalRevenue";
import SubscribedUsers from "./elements/SubscribedUsers";
// import HighestSubscription from "./elements/HighestSubscription";
import MostWatchedMovies from "./elements/MostWatchedMovies";
import MostWatchedSeries from "./elements/MostWatchedSeries";
// import RecentlyAddedMovies from "./elements/RecentlyAddedMovies";
// import ValueAddedCustomer from "./elements/ValueAddedCustomer";
// import RecentSubscriber from "./elements/RecentSubscriber";
// import Renewal from "./elements/Renewal";
import MonthlyRevenue from "./elements/MonthlyRevenue";
// import RegionChart from "./elements/RegionChart";
// import DistributorProducts from './elements/DistributorTables/DistributorProducts';
// import ProducerProducts from './elements/ProducerTables/ProducerProducts';
// import UsersByState from './elements/UsersByState'
// import AdvertiserElements from './elements/AdvertiserTables/AdvertiserElements';

// import MaxRentelMovie from './elements/MaxRentelMovie';

// Import the necessary components lazily
// const Features = React.lazy(() => import("./elements/Features"));
// const MaxLoginDuration = React.lazy(() =>
//   import("./elements/MaxLoginDuration")
// );
// const RegisteredUsers = React.lazy(() => import("./elements/RegisteredUsers"));
// const DailyRevenue = React.lazy(() => import("./elements/DailyRevenue"));
// const TotalRevenue = React.lazy(() => import("./elements/TotalRevenue"));
// const SubscribedUsers = React.lazy(() => import("./elements/SubscribedUsers"));
// const HighestSubscription = React.lazy(() =>
//   import("./elements/HighestSubscription")
// );
// const MostWatchedMovies = React.lazy(() =>
//   import("./elements/MostWatchedMovies")
// );
// const MostWatchedSeries = React.lazy(() =>
//   import("./elements/MostWatchedSeries")
// );
// const RecentlyAddedMovies = React.lazy(() =>
//   import("./elements/RecentlyAddedMovies")
// );
// const ValueAddedCustomer = React.lazy(() =>
//   import("./elements/ValueAddedCustomer")
// );
// const RecentSubscriber = React.lazy(() =>
//   import("./elements/RecentSubscriber")
// );
// const Renewal = React.lazy(() => import("./elements/Renewal"));
// const MonthlyRevenue = React.lazy(() => import("./elements/MonthlyRevenue"));
// const RegionChart = React.lazy(() => import("./elements/RegionChart"));
// const DistributorProducts = React.lazy(() =>
//   import("./elements/DistributorTables/DistributorProducts")
// );
// const ProducerProducts = React.lazy(() =>
//   import("./elements/ProducerTables/ProducerProducts")
// );
// const UsersByState = React.lazy(() => import("./elements/UsersByState"));
// const AdvertiserElements = React.lazy(() =>
//   import("./elements/AdvertiserTables/AdvertiserElements")
// );
// const MaxRentelMovie = React.lazy(() => import("./elements/MaxRentelMovie"));

// const ProducerMovieGraph = React.lazy(() =>
//   import("./elements/ProducerMovieGraph")
// );
// const AdvertisementViewGraph = React.lazy(() =>
//   import("./elements/AdvertisementGraph")
// );
// const Advertisements = React.lazy(() =>
//   import("./elements/AdvertiserTables/Advertisements")
// );

export default function Dashboard() {
  const role = useSelector((state) => state.layout.role);
  const user = useSelector((state) => state.layout.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.id) {
      const data = new FormData();
      data.append("id", user?.id);
      dispatch(movies_data_dashboard(data));
      dispatch(count_on_dashboard(data));
      // dispatch(total_subscribe_user(data))
      //  { role == "Distributor"&& role == "Producer" && dispatch(bank_detail_list(data));}
      dispatch(most_watch_tv_show_dashboard(data));
      dispatch(most_watched_movie())
      // dispatch(recent_subscriber_dashboard(data))
    }
  }, [user?.id]);
  useEffect(() => {
    dispatch(highest_movie_transaction_count());
  }, []);
  const registeredUsers = useSelector((state) => state.dashboard.totalusers);
  const maxRentelMovie = useSelector(
    (state) => state.dashboard.highest_movie_tran_count
  );
  const getAccountDetailList = useSelector(
    (state) => state?.bankDetails?.bankdetaillist
  );

  const dashboardcount = useSelector(
    (state) => state.dashboard.dashboardcount?.data
  );
  const recently_added_data = useSelector(
    (state) => state.dashboard.dashboardmovies?.recently_added_data
  );
  const most_watch_movies = useSelector(
    (state) => state.dashboard?.most_watch_movies
  );
  const tv_show_dashboard = useSelector(
    (state) => state.dashboard?.tv_show_dashboard
  );
console.log(tv_show_dashboard ,"new Video")
  // const recentSubscriberDashboard= useSelector((state) => state.dashboard?.recent_subscriber_dashboard);
  return (
    <Suspense>
      <>
        {/* { getAccountDetailList?.data?.length == 0 &&<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}> 
            { role != "Admin" && role != "Sub Admin" &&  <ProfileIncompleteErr/>}
             </div>} */}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          <Grid item xs={12} md={7} lg={7} xl={8}>
            <RegisteredUsers registeredUsers={registeredUsers} />
          </Grid>
          <Grid item xs={12} md={7} lg={5} xl={4}>
            <SubscribedUsers />
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
           <Features dashboardcount={dashboardcount} role={role} />
           <HourlySubscriptionChart/>
          </Grid>
        </Grid>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
      
          <Grid item xs={12} md={12} lg={12} xl={8}>
            <MonthlyRevenue />
            <TotalRevenue />
            <MaxLoginDuration />
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={4}>
            <DailyRevenue />
            <MostWatchedMovies most_watch_movies={most_watch_movies} />
             <MostWatchedSeries tv_show_dashboard={tv_show_dashboard} />
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={8}>
 
          </Grid>
        </Grid>
        {/* <Grid item xs={12} md={12} lg={12} xl={12}>  {role == "Distributor" && <DistributorProducts />}</Grid> */}
        {/* {role == "Distributor" &&
              role != "Advertiser" &&
              role != "Producer" && (
                <Features dashboardcount={dashboardcount} role={role} />
              )} */}
        {/* <Grid item xs={12} md={12} lg={12} xl={12}>
              {role == "Producer" && <ProducerProducts />}
              {role == "Producer" && <ProducerMovieGraph />}
            </Grid>
  
            <Grid item xs={12} md={12} lg={12} xl={12}>
              {role != "Advertiser" &&
                role != "Distributor" &&
                role != "Producer" && (
                  <Features dashboardcount={dashboardcount} role={role} />
                )}
            </Grid> */}
        {/* <Grid item xs={12} md={12} lg={12} xl={12}>
              {role != "Advertiser" &&
                role != "Distributor" &&
                role != "Producer" && (
                  <MaxRentelMovie maxRentelMovie={maxRentelMovie?.data} />
                )}
            </Grid> */}
        {/* <Grid item xs={12} md={12} lg={12} xl={role != "Distributor" ? 8 :12}>
          
  
              <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                <Grid item xs={12} md={12}>
                  {role != "Advertiser" && role != "Producer" && (
                    <MonthlyRevenue monthlyrevenue={monthlyrevenue} />
                  )}
                </Grid>
                 */}

        {/* <Grid item xs={12} md={4}>
          
                <Impressions />
  
           
                <ActivityTimeline />
              </Grid> */}

        {/* <Grid item xs={12} md={12}>
                  {role != "Advertiser" &&
                    role != "Producer" &&
                    role != "Distributor" && <TotalRevenue />}
                </Grid>
                <Grid item xs={12} md={12}>
                  {role != "Distributor" &&
                    role != "Advertiser" &&
                    role != "Producer" && <MaxLoginDuration />}
                </Grid>
                <Grid item xs={12} md={12}>
                  {role != "Distributor" &&
                    role != "Advertiser" &&
                    role != "Producer" && <Renewal />}
                </Grid> */}
        {/* <Grid item xs={12} md={12}> */}
        {/* {role != "Distributor" && role != "Advertiser" && (
                    <RegionChart />
                  )} */}

        {/* {role!="Distributor"&&role!="Advertiser"&&<RecentSubscriber recentSubscriberDashboard={recentSubscriberDashboard}/>} */}
        {/* </Grid> */}
        {/* </Grid> */}

        {/* {role != "Distributor" &&  <Grid item xs={12} md={12} lg={12} xl={4}>
              {role != "Distributor" &&
                role != "Advertiser" &&
                role != "Producer" && <UsersByState />}
  
              {role != "Advertiser" && role != "Producer" && <DailyRevenue />}
  
           
              {role != "Distributor" &&
                role != "Advertiser" &&
                role != "Producer" && (
                  <MostWatchedMovies most_watch_movies={most_watch_movies} />
                )}
              {role != "Distributor" &&
                role != "Advertiser" &&
                role != "Producer" && (
                  <MostWatchedSeries tv_show_dashboard={tv_show_dashboard} />
                )}
            </Grid>} */}
        {/* </Grid> */}

        {/* { role == "Distributor" &&  <Grid item xs={12} md={12}>
  
                    <HighestWatchedMoviesGraph  />
                  
                </Grid>} */}
        {/* {role == "Advertiser" && <AdvertisementViewGraph />}
          {role == "Advertiser" && <Advertisements />} */}

        {/* {role=="Advertiser"&&<AdvertiserElements/>} */}

        {/* {role!="Distributor"&&role!="Advertiser"&& <RecentlyAddedMovies recently_added_data={recently_added_data}/>} */}
        {/* {role!="Distributor"&&role!="Advertiser"&&  <ValueAddedCustomer />} */}
      </>{" "}
    </Suspense>
  );
}
