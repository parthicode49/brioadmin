// import Dashboard from "../components/Dashboard/Dashboard";
import React from "react";
import Movie from "../components/Movie/Movie/Movie";
import MastersModule from "../modules/MastersModule";
import { useSelector } from "react-redux";
import StripePayment from "../components/Advertisement/Stripe/StripePayment";
import PaymentSuccess from "../components/Advertisement/Stripe/PaymentSuccess";
import ProtectedRoute from "./ProtectedRoute";
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
// const DistributorSeries = React.lazy(() =>
//   import("../components/DistributorPanel/DistributorSeries")
// );
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
const AdDetails = React.lazy(() => import("../components/Advertisement/AdDetailPage") )
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
const LeavingSoon = React.lazy(() =>
  import("../components/ContentLeaving/ContentLeaving")
);
const DistributorCoupon = React.lazy(() =>
  import("../components/DistributorPanel/DistributorCoupon")
);
const DistributorDitails = React.lazy(() =>
  import("../components/Distributor/DistributorInfo/DistributorInfo")
);
const LiveStream = React.lazy(() =>
  import("../components/LiveStream/LiveStream")
);
const AdDashboard = React.lazy(() =>
  import("../components/Dashboard/AdDashboard")
);
const AdvertisementAdPannel = React.lazy(() =>
  import("../components/AdPannel/Advertisement")
);
const AdPaymentHistory = React.lazy(() =>
  import("../components/AdPannel/AdPaymentHistory")
);
const Advertisement = React.lazy(() =>
  import("../components/Advertisement/Advertisement")
);

const DistributorMovie = React.lazy(() =>
  import("../components/DistributorPanel/Movie/Movie")
);
const DistributorSeries = React.lazy(() =>
  import("../components/DistributorPanel/Series/Series")
);
const AdPayment = React.lazy(() =>
  import("../components/Advertisement/AdHistory")
);

export const usePrivateRoutes = () => {
  const reduxRole = useSelector((state) => state.layout.role);
  const loginedDetails = JSON.parse(sessionStorage.getItem("loggedInDetails"));
  const reduxRights = useSelector((state) => state?.layout?.rights);
  const rights = reduxRights || loginedDetails?.master_rights;
  const role = reduxRole || loginedDetails?.role;
  const getAccessLevel = (contentName) => {
    if (!rights || !Array.isArray(rights)) {
      console.log("Rights is not an array or undefined");
      return role === "Admin" ? "All Access" : "No Access";
    }

    const right = rights?.find((r) => r.content === contentName);
    const accessLevel =
      right?.content_value || (role === "Admin" ? "All Access" : "No Access");
    console.log(`Access for ${contentName}:`, accessLevel);
    return accessLevel;
  };

  if (role == "Admin" || role == "Sub Admin") {
    return [
      {
        path: `/Dashboard`,
        Component: (
          <ProtectedRoute requiredAccess="Dashboard">
            {" "}
            <Dashboard />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: `/movie`,
        Component: (
          <ProtectedRoute requiredAccess="Movies">
            {" "}
            <Movie />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: `/comingsoon`,
        Component: (
          <ProtectedRoute requiredAccess="Coming Soon">
            <ComingSoon />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: `/movie/detail`,
        Component: <MovieDetail />,
      },

      {
        path: `/livestream`,
        Component: (
          <ProtectedRoute requiredAccess="Live Stream">
            {" "}
            <LiveStream />{" "}
          </ProtectedRoute>
        ),
      },

      {
        path: `/series`,
        Component: (
          <ProtectedRoute requiredAccess="Series">
            <Series />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: `/series/detail`,
        Component: <SeriesDetail />,
      },
      {
        path: `/season`,
        Component: (
          <ProtectedRoute requiredAccess="Season">
            <Season />
          </ProtectedRoute>
        ),
      },
      {
        path: `/episode`,
        Component: (
          <ProtectedRoute requiredAccess="Episode">
            <Episode />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: `/episode/detail`,
        Component: <EpisodeDetail />,
      },
      {
        path: `/slider`,
        Component: (
          <ProtectedRoute requiredAccess="Slider">
            <Slider />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: `/customer`,
        Component: (
          <ProtectedRoute requiredAccess="Customers">
            <Customer />
          </ProtectedRoute>
        ),
      },
      {
        path: `/analytics`,
        Component: (
          <ProtectedRoute requiredAccess="Analytics">
            <Analytics />{" "}
          </ProtectedRoute>
        ),
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
        Component: (
          <ProtectedRoute requiredAccess="Subscriptions">
            {" "}
            <Subscription />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: `/promotion`,
        Component: (
          <ProtectedRoute requiredAccess="Promotions">
            <Promotion />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: `/advertiser`,
        Component: (
          <ProtectedRoute requiredAccess="Ad Master">
            {" "}
            <Advertiser />
          </ProtectedRoute>
        ),
      },
      {
        path: `/advertisement`,
        Component: (
          <ProtectedRoute requiredAccess="Ad Master">
            {" "}
            <Advertisement />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: `/advertisement/detail`,
        Component: (
          
            <AdDetails />
          
        ),
      },
      {
        path: `/adpayment`,
        Component: (
          <ProtectedRoute requiredAccess="Ad Master">
            <AdPayment />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: `/notification`,
        Component: (
          <ProtectedRoute requiredAccess="Notification">
            {" "}
            <Notification />
          </ProtectedRoute>
        ),
      },
      {
        path: `/transaction`,
        Component: (
          <ProtectedRoute requiredAccess="Transactions">
            <Transaction />
          </ProtectedRoute>
        ),
      },
      {
        path: `/masters/*`,
        Component: (
          <ProtectedRoute requiredAccess="Control Panel">
            {" "}
            <MastersModule />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: `/distributor/*`,
        Component: (
          <ProtectedRoute requiredAccess="Content Owner">
            {" "}
            <Distributor />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: `/complaints/*`,
        Component: (
          <ProtectedRoute requiredAccess="Complaints">
            {" "}
            <Complaints />{" "}
          </ProtectedRoute>
        ),
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
        Component: (
          <ProtectedRoute requiredAccess="Top Ten Video">
            <TopTenVideos />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: `/leavingsoon`,
        Component: (
          <ProtectedRoute requiredAccess="Content Leaving Soon">
            <LeavingSoon />
          </ProtectedRoute>
        ),
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
        Component: (
          <ProtectedRoute requiredAccess="Setting">
            <SettingModule />{" "}
          </ProtectedRoute>
        ),
      },
    ];
  } else if (role == "Distributor") {
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
        Component: <DistributorMovie />,
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
  } else if (role == "advertiser") {
    return [
      {
        path: `/Dashboard`,
        Component: <AdDashboard />,
      },
      {
        path: `/advertisement`,
        Component: <AdvertisementAdPannel />,
      },
      {
        path: `/paymenthistory`,
        Component: <AdPaymentHistory />,
      },
      {
        path: `/stripe-payment`,
        Component: <StripePayment />,
      },
      {
        path: `/payment-success`,
        Component: <PaymentSuccess />,
      },
    ];
  }
};
