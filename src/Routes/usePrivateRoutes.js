// import Dashboard from "../components/Dashboard/Dashboard";
import React from "react";
import Movie from "../components/Movie/Movie/Movie";
import MastersModule from "../modules/MastersModule";
import { useSelector } from "react-redux";
const Dashboard = React.lazy(() => import("../components/Dashboard/Dashboard"));
const Distributor = React.lazy(() => import("../modules/DistributorsModule"));
const Series = React.lazy(() =>
  import("../components/WebSeries/Series/Series")
);
const Season = React.lazy(() =>
  import("../components/WebSeries/Season/Season")
);
const Episode = React.lazy(() =>
  import("../components/WebSeries/Episode/Episode")
);
const Slider = React.lazy(() =>
  import("../components/SliderBanner/SliderBanner")
);
const Subscription = React.lazy(() =>
  import("../components/Subscription/Subscriptions")
);
const Promotion = React.lazy(() => import("../components/Promotion/Promotion"));
const Advertiser = React.lazy(() =>
  import("../components/Advertisers/Advertisers")
);
const DistributorDashboard = React.lazy(() =>
  import("../components/Dashboard/DistributorDashboard")
);

const DistributorMovies = React.lazy(() =>
  import("../components/DistributorPanel/DistributorMovies")
);
const ContentForm = React.lazy(() =>
  import("../components/DistributorPanel/ContentForm")
);
const DistributorSeries = React.lazy(() =>
  import("../components/DistributorPanel/DistributorSeries")
);
const SettingModule = React.lazy(() => import("../modules/SettingModule"));
// const MovieDetailsModule = React.lazy(() =>
//   import("../components/MovieDetails/MovieDetails")
// )
const Customer = React.lazy(() => import("../components/Customer/Customer"));

const AdminContentForm = React.lazy(() =>
  import("../components/Distributor/ContentForm")
);
const ComingSoon = React.lazy(() =>
  import("../components/ComingSoon/ComingSoon")
);
const Song = React.lazy(() => import("../components/Song/Song"));
const SongSlider = React.lazy(() =>
  import("../components/SliderBanner/SongSliderBanner")
);
const Notification = React.lazy(() =>
  import("../components/Notification/Notification")
);
const DistributorNotification = React.lazy(() =>
  import("../components/Notification/DistributorNotification")
);
const MovieDetail = React.lazy(() =>
  import("../components/Movie/MovieDetail/ProductDetailsContent")
);
const CustomerDetail = React.lazy(() =>
  import("../components/CustomerDetail/CustomerDetail")
);
const SeriesDetail = React.lazy(() =>
  import("../components/SeriesDetails/ProductDetailsContent")
);
const DistributorSong = React.lazy(() =>
  import("../components/DistributorPanel/DistributorSong")
);
const Transaction = React.lazy(() =>
  import("../components/Transaction/Transaction")
);
const Analytics = React.lazy(() => import("../components/Analytics/Analytics"));
const Complaints = React.lazy(() =>
  import("../components/Complaint/Complaint")
);
const SongDetail = React.lazy(() =>
  import("../components/Song/SongDetail/SongDetailsContent")
);
const EpisodeDetail = React.lazy(() =>
  import("../components/WebSeries/Episode/EpisodeDetail/EpisodeDetailsContent")
);
const VideoRentedTable = React.lazy(() =>
  import("../components/CustomerDetail/MoviesRented")
);
const MovieWatchTable = React.lazy(() =>
  import("../components/CustomerDetail/MoviesWatched")
);
const EpisodeWatchedTable = React.lazy(() =>
  import("../components/CustomerDetail/EpisodeWatched")
);
const SongWatchedTable = React.lazy(() =>
  import("../components/CustomerDetail/SongWatched")
);
const WatchListTable = React.lazy(() =>
  import("../components/CustomerDetail/WatchedList")
);
const Promocode = React.lazy(() => import("../components/Coupon/Coupon"));
const PromocodeDetail = React.lazy(() =>
  import("../components/Coupon/CouponHistory")
);
const TopTenVideos = React?.lazy(() =>
  import("../components/TopTenMovie/TopTenMovie")
);
const LeavingSoon = React.lazy(()=>
  import("../components/ContentLeaving/ContentLeaving")
)
const DistributorCoupon = React.lazy(() => 
  import("../components/DistributorPanel/DistributorCoupon")
)
const DistributorDitails = React.lazy(()=>
  import("../components/Distributor/DistributorInfo/DistributorInfo")
)
const LiveStream = React.lazy(()=>
  import("../components/LiveStream/LiveStream")
)
export const usePrivateRoutes = () => {
  const reduxRole = useSelector((state) => state.layout.role);
  const loginedDetails = JSON.parse(sessionStorage.getItem("loggedInDetails"));
  const role = reduxRole || loginedDetails?.role;
  console.log(role, "fgsaaaaaaa");

  if (role == "Admin") {
    return [
      {
        path: `/Dashboard`,
        Component: <Dashboard />,
      },
      {
        path: `/movie`,
        Component: <Movie />,
      },
      {
        path: `/comingsoon`,
        Component: <ComingSoon />,
      },
      {
        path: `/movie/detail`,
        Component: <MovieDetail />,
      },
      {
        path: `/song`,
        Component: <Song />,
      },
      {
        path: `/livestream`,
        Component: <LiveStream />,
      },
      {
        path: `/song/detail`,
        Component: <SongDetail />,
      },
      {
        path: `/series`,
        Component: <Series />,
      },
      {
        path: `/series/detail`,
        Component: <SeriesDetail />,
      },
      {
        path: `/season`,
        Component: <Season />,
      },
      {
        path: `/episode`,
        Component: <Episode />,
      },
      {
        path: `/episode/detail`,
        Component: <EpisodeDetail />,
      },
      {
        path: `/slider`,
        Component: <Slider />,
      },
      {
        path: `/customer`,
        Component: <Customer />,
      },
      {
        path: `/analytics`,
        Component: <Analytics />,
      },
      {
        path: `/customer/detail`,
        Component: <CustomerDetail />,
      },
      {
        path: `/customer/detail/videorental`,
        Component: <VideoRentedTable />,
      },
      {
        path: `/customer/detail/moviewatch`,
        Component: <MovieWatchTable />,
      },
      {
        path: `/customer/detail/episodewatch`,
        Component: <EpisodeWatchedTable />,
      },
      {
        path: `/customer/detail/songwatch`,
        Component: <SongWatchedTable />,
      },
      {
        path: `/customer/detail/watchlist`,
        Component: <WatchListTable />,
      },
      {
        path: `/subscription`,
        Component: <Subscription />,
      },
      {
        path: `/promotion`,
        Component: <Promotion />,
      },
      {
        path: `/songslider`,
        Component: <SongSlider />,
      },
      {
        path: `/advertiser`,
        Component: <Advertiser />,
      },
      {
        path: `/notification`,
        Component: <Notification />,
      },
      {
        path: `/transaction`,
        Component: <Transaction />,
      },
      {
        path: `/masters/*`,
        Component: <MastersModule />,
      },
      {
        path: `/distributor/*`,
        Component: <Distributor />,
      },
      {
        path: `/complaints/*`,
        Component: <Complaints />,
      },
      {
        path: `/contentform`,
        Component: <AdminContentForm />,
      },
      {
        path: `/promocode`,
        Component: <Promocode />,
      },
      {
        path: `/toptenvideos`,
        Component: <TopTenVideos />,
      },
      {
        path: `/leavingsoon`,
        Component: <LeavingSoon />,
      },
      {
        path: `/promocode/detail`,
        Component: <PromocodeDetail />,
      },
      {
        path: `/distributor/detail`,
        Component: <DistributorDitails />,
      },
      {
        path: `/setting/*`,
        Component: <SettingModule />,
      },
    ];
  } else {
    return [
      {
        path: `/Dashboard`,
        Component: <DistributorDashboard />,
      },
      {
        path: `/contentform`,
        Component: <ContentForm />,
      },
      {
        path: `/movies`,
        Component: <DistributorMovies />,
      },
      {
        path: `/movies/detail`,
        Component: <MovieDetail />,
      },
      {
        path: `/series`,
        Component: <DistributorSeries />,
      },
      {
        path: `/series/detail`,
        Component: <SeriesDetail />,
      },
      {
        path: `/song`,
        Component: <DistributorSong />,
      },
      {
        path: `/song/detail`,
        Component: <SongDetail />,
      },
      {
        path: `/notification`,
        Component: <DistributorNotification />,
      },
      {
        path: `/distributorcoupon`,
        Component: <DistributorCoupon />,
      },
    ];
  }
};
