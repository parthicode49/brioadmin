import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {
  Link as RouterLink,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

const breadcrumbMap = {
  'Analytics': {name:'Analytics',path:"/Analytics"},
  'CreateMovie': { name: 'Create Movie', path: "/Movie/CreateMovie" },
  'EditMovie': { name: 'Edit Movie', path: "/Movie/EditMovie" },
  'Movie': { name: 'Movie', path: "/Movie" },

  'UpcomingMovie': { name: 'Upcoming Movies', path: "/Movie/UpcomingMovie" },
  'EditUpcomingMovie': { name: 'Edit Upcoming Movies', path: "/Movie/EditUpcomingMovie" },
  'CreateUpcomingMovie': { name: 'Create Upcoming Movies', path: "/Movie/CreateUpcomingMovie" },

  'Series': { name: 'Series', path: "/Series/Series/" },
  'EditSeries': { name: 'Edit Series', path: "/Series/EditSeries/" },
  'CreateSeries': { name: 'Create Series', path: "/Series/CreateSeries/" },

  'CollaboratorForm': { name: 'Collaborator Form', path: "/CollaboratorForm/CollaboratorForm/" },
  'EditCollaboratorForm': { name: 'Edit Collaborator Form', path: "/CollaboratorForm/EditCollaboratorForm/" },
  'CreateCollaboratorForm': { name: 'Create Collaborator Form', path: "/CollaboratorForm/CreateCollaboratorForm/" },

  'BankDetails' : {name:"Bank Details" ,path:"/BankDetails/BankDetails/"},
  'Payment': { name: 'Distributor Movie List', path: "/Payment/DistributorsMovieList" },
  'Payment': { name: 'Opt Verification', path: "/Payment/OtpVerification" },

  'AdForm': { name: 'Ad Form', path: "/AdForm/AdForm/" },
  'CreateAdForm': { name: 'Create AdForm', path: "/AdForm/CreateAdForm/" },
  'EditAdForm': { name: 'Edit AdForm', path: "/AdForm/EditAdForm/"},
  "AdTransaction" : {name:"Ad Transaction" , path:"/AdTransaction/AdTransaction/"},

  "ContentAdvisory" : {name:"Content Advisory" , path:"/ContentAdvisory/ContentAdvisory/"},
  "CreateContentAdvisory" : {name:"Create Content Advisory" , path:"/ContentAdvisory/CreateContentAdvisory/"},
  "EditContentAdvisory" : {name:"Edit Content Advisory" , path:"/ContentAdvisory/EditContentAdvisory/"},

"reports" : {name:"Reports" , path:"/reports/reports"}, 
'reports_download' : {name:"Reports Download" , path :"/reports/reports_download/"},
  'Episode': { name: 'Episode', path: "/Episode/Episode/" },
  'EditEpisode': { name: 'Edit Episode', path: "/Episode/EditEpisode/" },
  'CreateEpisode': { name: 'Create Episode', path: "/Episode/CreateEpisode/" },
  

  'SetMovieAdvertisement' : {name:"Set Movie Advertisement" , path : "/SetMovieAdvertisement/SetMovieAdvertisement"},
  'EditSetMovieAdvertisement' : {name:"Edit Set Movie Advertisement" , path : "/SetMovieAdvertisement/EditSetMovieAdvertisement"},
  'CreateSetMovieAdvertisement' : {name:"Create Set Movie Advertisement" , path : "/SetMovieAdvertisement/CreateSetMovieAdvertisement"},

  'SetSeriesAdvertisement' : {name:"Set Series Advertisement" , path : "/SetSeriesAdvertisement/SetSeriesAdvertisement"},
  'EditSetSeriesAdvertisement' : {name:"Edit Set Series Advertisement" , path : "/SetSeriesAdvertisement/EditSetSeriesAdvertisement"},
  'CreateSetSeriesAdvertisement' : {name:"Create Set Series Advertisement" , path : "/SetSeriesAdvertisement/CreateSetSeriesAdvertisement"},

  'movie_testing' : {name:"Movie Testing" , path :"/movie_testing/movie_testing/"},
  'create_movie_testing' : {name:"Create Movie Testing" , path :"/movie_testing/create_movie_testing/"},

  'series_testing' : {name:"Series Testing" , path :"/series_testing/series_testing/"},
  'create_series_testing' : {name:"Create Series Testing" , path :"/series_testing/create_series_testing/"},


  'Season': { name: 'Season', path: "/Season/Season/" },
  'CreateSeason': { name: 'Create Season', path: "/Season/CreateSeason/" },
  'EditSeason': { name: 'Edit Season', path: "/Season/EditSeason/" },

  'TVCategory': { name: 'Streaming Category', path: "/LiveStreaming/TVCategory" },
  'CreateTVCategory': { name: 'Create Streaming Category', path: "/LiveStreaming/CreateTVCategory" },
  'EditTVCategory': { name: 'Edit Streaming Category', path: "/LiveStreaming/EditTVCategory" },

  'TVChannel': { name: 'Channel', path: "/LiveStreaming/TVChannel" },
  'CreateTVChannel': { name: 'Create Channel', path: "/LiveStreaming/CreateTVChannel" },
  'EditTVChannel': { name: 'Edit Channel', path: "/LiveStreaming/EditTVChannel" },

  'SliderBanner': { name: 'Slider Banner', path: "/SliderBanner/SliderBanner" },
  'CreateSliderBanner': { name: 'Create Slider Banner', path: "/SliderBanner/CreateSliderBanner" },
  'EditSliderBanner': { name: 'Edit Slider Banner', path: "/SliderBanner/EditSliderBanner" },

  'Customer': { name: 'Customers', path: "/Customer/Customer" },
  'PremiumCustomer': { name: 'Premium Customers', path: "/Customer/PremiumCustomer" },

  'Transactions': { name: 'Transactions', path: "/Transactions/Transactions/" },
  'WatchHours': { name: 'Watch-hours', path: "/WatchHours/WatchHours/" },

  'Distributors': { name: 'Collaborator', path: "/Distributors/Distributors/" },
  'CreateDistributors': { name: 'Create Collaborator', path: "/Distributors/CreateDistributors/" },
  'EditDistributors': { name: 'Edit Collaborator', path: "/Distributors/EditDistributors/" },
  
  'Producers': { name: 'Producers', path: "/Producers/Producers/" },
  'CreateProducers': { name: 'Create Producer', path: "/Producers/CreateProducers/" },
  'EditProducers': { name: 'Edit Producer', path: "/Producers/EditProducers/" },

  'DistributerProducts': { name: "Producer's Products", path: "/Distributors/DistributerProducts/" },
  'Complaint': { name: 'Complaints', path: "/Complaint/Complaint/" },

  'SeriesDetails': {name:'Series Details' , path:"/Series/Series/SeriesDetails/"},
  
  'Subscriptions': { name: 'Subscriptions', path: "/Subscriptions/Subscriptions/" },
  'CreateSubscriptions': { name: 'Create Subscriptions', path: "/Subscriptions/CreateSubscriptions/" },
  'EditSubscriptions': { name: 'Edit Subscriptions', path: "/Subscriptions/EditSubscriptions/" },

  'Promotion': { name: 'Promotion', path: "/Promotion/Promotion" },
  'CreatePromotion': { name: 'Create Promotion', path: "/Promotion/CreatePromotion" },
  'EditPromotion': { name: 'Edit Promotion', path: "/Promotion/EditPromotion" },

  'Highlight': { name: 'Highlight', path: "/Highlight/Highlight" },
  'CreateHighlight': { name: 'Create Highlight', path: "/Highlight/CreateHighlight" },
  'EditHighlight': { name: 'Edit Highlight', path: "/Highlight/EditHighlight" },


  'Coupon': { name: 'Promocode', path: "/Coupon/Coupon" },
  'CreateCoupon': { name: 'Create Promocode', path: "/Coupon/CreateCoupon" },
  'EditCoupon': { name: 'Edit Promocode', path: "/Coupon/EditCoupon" },

  'PromocodeHistory': { name: 'Promocode History', path: "/Coupon/PromocodeHistory" },

  'Advertisers': { name: 'Advertisers', path: "/Advertisers/Advertisers/" },
  'CreateAdvertisers': { name: 'Create Advertisers', path: "/Advertisers/CreateAdvertisers/" },
  'EditAdvertisers': { name: 'Edit Advertisers', path: "/Advertisers/EditAdvertisers/" },

  'Advertisement': { name: 'Advertisement', path: "/Advertisers/Advertisement/" },
  'CreateAdvertisement': { name: 'Create Advertisement', path: "/Advertisers/CreateAdvertisement/" },
  'EditAdvertisement': { name: 'Edit Advertisement', path: "/Advertisers/EditAdvertisement/" },

  'Masters': { name: 'Masters', path: "/Masters/Category/" },


  'Avatar': { name: 'Avatar', path: "/Masters/Avatar/Avatar" },
  'CreateAvatar': { name: 'Create Avatar', path: "/Masters/Avatar/CreateAvatar" },
  'EditAvatar': { name: 'Edit Avatar', path: "/Masters/Avatar/EditAvatar" },

  'Category': { name: 'Category', path: "/Masters/Category/Category/" },
  'CreateCategory': { name: 'Create Category', path: "/Masters/Category/CreateCategory/" },
  'EditCategory': { name: 'Edit Category', path: "/Masters/Category/EditCategory/" },

  'SubOtt': { name: 'SubOtt', path: "/Masters/SubOtt/SubOtt/" },
  'CreateSubOtt': { name: 'Create SubOtt', path: "/Masters/SubOtt/CreateSubOtt/" },
  'EditSubOtt': { name: 'Edit SubOtt', path: "/Masters/SubOtt/EditSubOtt/" },

  'PaymentGateWay' : {name: 'Payment Gateway' , path : "/Masters/PaymentGateWay/"},


  'DistributorsFormData' : {name:"Collaborator" , path:"/DistributorsFormData/DistributorsFormData/"},
  'DistributorsFormDetails' : {name:'form Details' ,path :"/DistributorsFormData/DistributorsFormDetails/DistributorsFormDetails/"},

  'SubCategory': { name: 'Sub Category', path: "/Masters/SubCategory/SubCategory" },
  'CreateSubCategory': { name: 'Create Sub Category', path: "/Masters/SubCategory/CreateSubCategory" },
  'EditSubCategory': { name: 'Edit Sub Category', path: "/Masters/SubCategory/EditSubCategory" },

  'OttName': { name: 'Ott Name', path: "/Masters/OttName/OttName" },
  'CreateOttName': { name: 'Create Ott Name', path: "/Masters/OttName/CreateOttName" },
  'EditOttName': { name: 'Edit Ott Name', path: "/Masters/OttName/EditOttName" },

  'Language': { name: 'Language', path: "/Masters/Language/Language" },
  'CreateLanguage': { name: 'Create Language', path: "/Masters/Language/CreateLanguage" },
  'EditLanguage': { name: 'Edit Language', path: "/Masters/Language/EditLanguage" },

  'Genre': { name: 'Genre', path: "/Masters/Genre/Genre/" },
  'CreateGenre': { name: 'Create Genre', path: "/Masters/Genre/CreateGenre/" },
  'EditGenre': { name: 'Edit Genre', path: "/Masters/Genre/EditGenre/" },

  'ComplaintType': { name: 'ComplaintType', path: "/Masters/ComplaintType/ComplaintType/" },

  'Country': { name: 'Country', path: "/Masters/Country/Country/" },


  'Cast': { name: 'Cast', path: "/Masters/Cast/Cast/" },
  'CreateCast': { name: 'Create Cast', path: "/Masters/Cast/CreateCast/" },
  'EditCast': { name: 'Edit Cast', path: "/Masters/Cast/EditCast/" },

  'SubAdmin': { name: 'Sub Admin', path: "/Masters/SubAdmin/SubAdmin" },
  'CreateSubAdmin': { name: 'Create Sub Admin', path: "/Masters/SubAdmin/CreateSubAdmin" },
  'EditSubAdmin': { name: 'Edit Sub Admin', path: "/Masters/SubAdmin/EditSubAdmin" },

  'Settings': { name: 'Settings', path: "/Settings/AboutUs/" },
  'AboutUs': { name: 'About Us', path: "/Settings/AboutUs/" },
  'PrivacyPolicy': { name: 'Privacy Policy', path: "/Settings/PrivacyPolicy/" },
  'TermsConditions': { name: 'Terms & Conditions', path: "/Settings/TermsConditions/" },
  'RefundPolicy': { name: 'Refund Policy', path: "/Settings/RefundPolicy/" },
  'ContactUs': { name: 'Contact Us', path: "/Settings/ContactUs/" },
  'AppSetting': { name: 'App Setting', path: "/Settings/AppSetting/" },
  'UserLogs': { name: 'User Logs', path: "/Settings/UserLogs/UserLogs" },
  'UserLogsDetails': { name: 'User Logs Details', path: "/Settings/UserLogs/UserLogsDetails" },
  'MovieDetails': { name: 'Movie Details', path: "/Movie/MovieDetails" },
  'EpisodeDetails': { name: 'Episode Details', path: "/WebSeries/Episode/EpisodeDetails" },
  'WebSeries': { name: 'TV Shows', path: "/WebSeries/Series/" },
  'CustomerDetail': { name: 'Customer Detail', path: "/Customer/CustomerDetail/CustomerDetail" },
  'LiveStreaming': { name: 'Live Streaming', path: "/LiveStreaming/TVCategory" },
  'MoviesDownloaded': { name: 'Movies Downloaded', path: "/Customer/CustomerDetail/MoviesDownloaded" },
  'MoviesWatched': { name: 'Movies Watched', path: "/Customer/CustomerDetail/MoviesWatched" },
  'MoviesRented': { name: 'Movies Rented', path: "/Customer/CustomerDetail/MoviesRented" },
  'Profile': { name: 'Profile', path: "/Dashboard/Profile/" },
  // 'Layout': {name:'',path:"/Dashboard/Dashboard"},
  'Notifications': { name: 'Notifications', path: "/Notifications/Notifications" },
  'EditNotifications': { name: 'Edit Notifications', path: "/Notifications/EditNotifications" },
  'CreateNotifications': { name: 'Create Notifications', path: "/Notifications/CreateNotifications" },


};



function LinkRouter(props) {
  return <Link {...props} component={RouterLink} />;
}

function Page() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((x) => x);
  const pathnames = paths[0] == "Dashboard" ? [] : [...new Set(paths)];

  return (
    <Breadcrumbs aria-label="breadcrumb" separator="›">
      {pathnames?.length&&<LinkRouter underline="hover" color="inherit" to="/Dashboard/Dashboard">
        Dashboard
      </LinkRouter>}
      {/* {pathnames.map((value, index) => {
        const last = index >= pathnames.length - 2;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {pathnames[index]}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {pathnames[index]}
          </LinkRouter>
        );
      })} */}
      {pathnames.map((ele, index) => index != pathnames.length - 1 ?
        <LinkRouter underline="hover" color="inherit" to={breadcrumbMap?.[ele].path} key={breadcrumbMap?.[ele].path}>
          {breadcrumbMap?.[ele].name}
        </LinkRouter> :

        <Typography color="text.primary" key={breadcrumbMap?.[ele]?.path}>
          {breadcrumbMap?.[ele]?.name}
        </Typography>)
      }
    </Breadcrumbs>
  );
}

export default function RouterBreadcrumbs() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (

    <Box sx={{ display: 'flex', flexDirection: 'column', ml: "30px" }} fontSize={"12px"}>
      <Routes>
        <Route path="*" element={<Page />} />
      </Routes>

    </Box>

  );
}
