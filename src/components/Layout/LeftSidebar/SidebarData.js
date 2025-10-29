import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import dashboard from "../../../images/SliderBanner/dashboard.png";
import dashboardDark from "../../../images/SliderBanner/dashboard_dark.png";
import analytics from "../../../images/SliderBanner/analytics.png";
import analyticsDark from "../../../images/SliderBanner/analytics_dark.png";
import content from "../../../images/SliderBanner/content.png";
import contentDark from "../../../images/SliderBanner/content_dark.png";
import webSeries from "../../../images/SliderBanner/webseries.png";
import webSeriesDark from "../../../images/SliderBanner/webseries_dark.png";
import content_owner from "../../../images/SliderBanner/content_owner.png";
import content_ownerDark from "../../../images/SliderBanner/content_owner_dark.png";
import slider from "../../../images/SliderBanner/slider.png";
import sliderDark from "../../../images/SliderBanner/slider_dark.png";
import customer from "../../../images/SliderBanner/customers.png";
import customerDark from "../../../images/SliderBanner/customers_dark.png";
import transition from "../../../images/SliderBanner/transaction.png";
import transitionDark from "../../../images/SliderBanner/transaction_dark.png";
import subscription from "../../../images/SliderBanner/subscriptions.png";
import subscriptionDark from "../../../images/SliderBanner/subscriptions_dark.png";
import controlPanel from "../../../images/SliderBanner/control_panel.png";
import controlPanelDark from "../../../images/SliderBanner/control_panel_dark.png";
import setting from "../../../images/SliderBanner/setting.png";
import settingDark from "../../../images/SliderBanner/setting_dark.png";
import { useSelector } from "react-redux";
export const SidebarData = (darkMode) => {
  const reduxRole = useSelector((state) => state.layout.role);
  const loginedDetails = JSON.parse(sessionStorage.getItem("loggedInDetails"));
  const role = reduxRole || loginedDetails?.role;
  const rights = useSelector((state) => state.layout.rights);
  if (role == "Admin") {
    return [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: (
          <img src={darkMode ? dashboard : dashboardDark} height={"20px"} />
        ),
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: "true",
      },
      {
        title: "Analytics",
        path: "/analytics",
        icon: (
          <img src={darkMode ? analytics : analyticsDark} height={"20px"} />
        ),
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: rights?.["Analytics"]?.["view"],
      },

      {
        title: "Content",
        path: "/Movie/",
        icon: <img src={darkMode ? content : contentDark} height={"20px"} />,
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: rights?.["Movie"]?.["view"],
        subNav: [
          {
            title: "Movie",
            path: "/movie",
            access: rights?.["Movie"]?.["view"],
          },
          {
            title: "Live Stream",
            path: "/livestream",
            access: rights?.["Movie"]?.["view"],
          },
          {
            title: "Coming Soon",
            path: "/comingsoon",
            access: rights?.["Movie"]?.["view"],
          },
        ],
      },

      {
        title: "Web Series",
        path: "/Series/",
        icon: (
          <img src={darkMode ? webSeries : webSeriesDark} height={"20px"} />
        ),
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: rights?.["Web Series"]?.["view"],
        subNav: [
          {
            title: "Series",
            path: "/series",
            access: rights?.["Web Series"]?.["view"],
          },
          {
            title: "Season",
            path: "/season",
            access: rights?.["Web Series"]?.["view"],
          },
          {
            title: "Episode",
            path: "/episode",
            access: rights?.["Web Series"]?.["view"],
          },
        ].filter((e) => e),
      },
      {
        title: "Content Owner",
        path: "/distributor",
        icon: (
          <img
            src={darkMode ? content_owner : content_ownerDark}
            height={"20px"}
          />
        ),
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: rights?.["Slider Banner"]?.["view"],
        subNav: [
          {
            title: "Create Profile",
            path: "/distributor",
            access: rights?.["Web Series"]?.["view"],
          },
          {
            title: "Acruired Content",
            path: "/contentform",
            access: rights?.["Web Series"]?.["view"],
          },
          {
            title: "Content Leaving",
            path: "/leavingsoon",
            access: rights?.["Web Series"]?.["view"],
          },
        ].filter((e) => e),
      },
      {
        title: "Slider",
        path: "/slider/",
        icon: <img src={darkMode ? slider : sliderDark} height={"20px"} />,
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: rights?.["Slider Banner"]?.["view"],
        subNav: [
          {
            title: "Slider",
            path: "/slider",
            access: rights?.["Web Series"]?.["view"],
          },
          // {
          //   title: "Song Slider",
          //   path: "/songslider",
          //   access: rights?.["Web Series"]?.["view"],
          // },
          {
            title: "Promotion",
            path: "/promotion",
            access: rights?.["Web Series"]?.["view"],
          },
          {
            title: "Top Ten Video",
            path: "/toptenvideos",
            access: rights?.["Web Series"]?.["view"],
          },
        ].filter((e) => e),
      },
      {
        title: "Customers",
        path: "/Customer/",
        icon: <img src={darkMode ? customer : customerDark} height={"20px"} />,
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: rights?.["Customers"]?.["view"],
        subNav: [
          {
            title: "All Customer",
            path: "/customer/",
            access: rights?.["Customers"]?.["view"],
          },
          // {
          //   title: "Premium Customer",
          //   path: "/Customer/PremiumCustomer/",
          //   access:  rights?.["Premium Customers"]?.["view"],
          // },
          {
            title: "Complaints",
            path: "/complaints",
            access: rights?.["Customers"]?.["view"],
          },
          {
            title: "Promocode",
            path: "/promocode",
            access: rights?.["Customers"]?.["view"],
          },
        ].filter((e) => e),
      },
      {
        title: "All Transactions",
        path: "/transaction",
        icon: (
          <img src={darkMode ? transition : transitionDark} height={"20px"} />
        ),
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: rights?.["Transactions"]?.["view"],
      },
      {
        title: "Subscription",
        path: "/subscription",
        icon: (
          <img
            src={darkMode ? subscription : subscriptionDark}
            height={"20px"}
          />
        ),
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: rights?.["Transactions"]?.["view"],
      },
      // {
      //   title: "Promotion",
      //   path: "/promotion",
      //   icon: (
      //     <img
      //       src={darkMode ? TransactionIcon : TransactionBlackIcon}
      //       height={"20px"}
      //     />
      //   ),
      //   iconClosed: <KeyboardArrowRightIcon />,
      //   iconOpened: <KeyboardArrowDownIcon />,
      //   access: rights?.["Transactions"]?.["view"],
      // },

      // {
      //   title: "Ad Submission",
      //   path: "/AdForm/AdForm/",
      //   icon: (
      //     <img
      //       src={darkMode ? Movie_Submission : MovieBlack_Submission}
      //       height={"20px"}
      //     />
      //   ),
      //   iconClosed: <KeyboardArrowRightIcon />,
      //   iconOpened: <KeyboardArrowDownIcon />,
      //   access: rights?.["Ad Submission"]?.["view"],
      // },
      // {
      //   title:
      //     role == "Advertiser"
      //       ? "Movie Advertisement"
      //       : "Set Movie Advertisement",
      //   path: "/SetMovieAdvertisement/SetMovieAdvertisement",
      //   icon: (
      //     <img
      //       src={darkMode ? Movie_Submission : MovieBlack_Submission}
      //       height={"20px"}
      //     />
      //   ),
      //   iconClosed: <KeyboardArrowRightIcon />,
      //   iconOpened: <KeyboardArrowDownIcon />,
      //   // access: rights?.["Set Movie Advertisement"]?.["view"],
      //   access: "true",
      // },
      // {
      //   title:
      //     role == "Advertiser"
      //       ? "Series Advertisement"
      //       : "Set Series Advertisement",
      //   path: "/SetSeriesAdvertisement/SetSeriesAdvertisement",
      //   icon: (
      //     <img
      //       src={darkMode ? Movie_Submission : MovieBlack_Submission}
      //       height={"20px"}
      //     />
      //   ),
      //   iconClosed: <KeyboardArrowRightIcon />,
      //   iconOpened: <KeyboardArrowDownIcon />,
      //   // access: rights?.["Set Series Advertisement"]?.["view"],
      //   access: "true",
      // },
      {
        title: "Ad Master",
        onClick: "true",
        path: "/AdForm/AdForm",
        icon: (
          <img
            src={darkMode ? controlPanel : controlPanelDark}
            height={"20px"}
          />
        ),
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: "true",
        subNav: [
          {
            title: "Ad Submission",
            path: "/AdForm/AdForm/",
            access: rights?.["Ad Submission"]?.["view"],
          },
          {
            title: "Advertisers",
            path: "/advertiser",
            access: rights?.["Advertisers"]?.["view"],
          },
          {
            title: "Create Ad",
            path: "/advertisement/",
            access: rights?.["Advertisement"]?.["view"],
          },
          {
            title: "Set Ads ( Movie )",
            path: "/SetMovieAdvertisement/SetMovieAdvertisement/",
            access: rights?.["Set Movie Advertisement"]?.["view"],
          },
          {
            title: "Set Ads ( Series )",
            path: "/SetSeriesAdvertisement/SetSeriesAdvertisement/",
            access: rights?.["Set Series Advertisement"]?.["view"],
          },
        ].filter((e) => e),
      },
      {
        title: "Control Panel",
        path: "/Masters/",
        icon: (
          <img
            src={darkMode ? controlPanel : controlPanelDark}
            height={"20px"}
          />
        ),
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        // access: rights?.["Masters"]?.["view"],

        subNav: [
          // role != "Distributor" && {
          //   title: "Avatar",
          //   path: "/Masters/Avatar/Avatar/",
          //   access: rights?.["Masters"]?.["view"],
          // },
          {
            title: "Category",
            path: "/masters/category/",
            access: rights?.["Masters"]?.["view"],
          },
          {
            title: "Sub Category",
            path: "/masters/subcategory",
            access: rights?.["Masters"]?.["view"],
          },
          {
            title: "Language",
            path: "/masters/language/",
            access: rights?.["Masters"]?.["view"],
          },
          {
            title: "Cast",
            path: "/masters/cast/",
            access: rights?.["Masters"]?.["view"],
          },
          {
            title: "Country",
            path: "/masters/country/",
            access: rights?.["Masters"]?.["view"],
          },
          // {
          //   title: "Song Category",
          //   path: "/masters/songcategory/",
          //   access: rights?.["Masters"]?.["view"],
          // },
          {
            title: "Complaint Type",
            path: "/masters/complainttype/",
            access: rights?.["Masters"]?.["view"],
          },
          {
            title: "Live Stream Category",
            path: "/masters/livestreamcategory/",
            access: rights?.["Masters"]?.["view"],
          },
          // {
          //   title: "Sub Ott",
          //   path: "/Masters/SubOtt/SubOtt/",
          //   access: rights?.["Masters"]?.["view"],
          // },
          // {
          //   title: "Cast",
          //   path: "/Masters/Cast/Cast/",
          //   access: rights?.["Masters"]?.["view"],
          // },
          // // {
          // //   title: "Country",
          // //   path: "/Masters/Country/Country/",
          // //   access: rights?.["Masters"]?.["view"],
          // // },
          {
            title: "Content Advisory",
            path: "/masters/contentadvisory",
            access: rights?.["Masters"]?.["view"],
          },
          // {
          //   title: "Sub Admin",
          //   path: "/masters/subadmin",
          //   access: rights?.["Masters"]?.["view"],
          // },
          // {
          //   title: "Payment Gateways",
          //   path: "/Masters/PaymentGateWay",
          //   access: rights?.["Masters"]?.["view"],
          // },
          // role == "Admin" && {
          //   title: "Sub Admin",
          //   path: "/Masters/SubAdmin/SubAdmin/",
          //   // access: rights?.["Sub Admin"]?.["view"],
          //   access: "true",
          // },
        ].filter((e) => e),
      },
      {
        title: "Settings",
        path: "/Settings/",
        icon: <img src={darkMode ? setting : settingDark} height={"20px"} />,
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        onClick: "true",
        access: rights?.["Setting"]?.["view"],
        subNav: [
          {
            title: "About Us",
            path: "/setting/aboutus/",
            access: rights?.["Setting"]?.["view"],
          },

          {
            title: "Privacy Policy",
            path: "/setting/privacypolicy/",
            access: rights?.["Setting"]?.["view"],
          },
          {
            title: "Terms & Conditions",
            path: "/setting/termsconditions/",
            access: rights?.["Setting"]?.["view"],
          },
          {
            title: "Refund Policy",
            path: "/setting/refundpolicy/",
            access: rights?.["Setting"]?.["view"],
          },

          {
            title: "Ad Price",
            path: "/setting/adprice/",
            access: rights?.["Setting"]?.["view"],
          },
          // {
          //   title: "User Logs",
          //   path: "/Settings/UserLogs/UserLogs",
          //   access: rights?.["User Logs"]?.["view"],
          // },
          // {
          //   title: "User Subscription",
          //   path: "/Settings/UserSubscription/",
          //   access: rights?.["Setting"]?.["view"],
          // },
        ].filter((e) => e),
      },
    ].filter((e) => e);
  } else if (role == "Distributor") {
    return [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: (
          <img src={darkMode ? dashboard : dashboardDark} height={"20px"} />
        ),
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: "true",
      },
      {
        title: "Submit Content",
        path: "/contentform",
        icon: (
          <img
            src={darkMode ? content_owner : content_ownerDark}
            height={"20px"}
          />
        ),
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: rights?.["Movie Submission"]?.["view"],
      },
      {
        title: "Movies",
        path: "/movies",
        icon: <img src={darkMode ? content : contentDark} height={"20px"} />,
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: rights?.["Movie Submission"]?.["view"],
      },
      {
        title: "Series",
        path: "/series",
        icon: (
          <img src={darkMode ? webSeries : webSeriesDark} height={"20px"} />
        ),
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: rights?.["Movie Submission"]?.["view"],
      },
      //  {
      //   title: "Song",
      //   path: "/song",
      //   icon: (
      //     <img
      //       src={darkMode ? content : contentDark}
      //       height={"20px"}
      //     />
      //   ),
      //   iconClosed: <KeyboardArrowRightIcon />,
      //   iconOpened: <KeyboardArrowDownIcon />,
      //   access: rights?.["Movie Submission"]?.["view"],
      // },
      {
        title: "Coupon",
        path: "/distributorcoupon",
        icon: <img src={darkMode ? customer : customerDark} height={"20px"} />,
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: rights?.["Movie Submission"]?.["view"],
      },
    ];
  } else if (role == "advertiser") {
    return [
            {
        title: "Dashboard",
        path: "/dashboard",
        icon: (
          <img src={darkMode ? dashboard : dashboardDark} height={"20px"} />
        ),
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: "true",
      },
            {
        title: "Advertisement",
        path: "/advertisement",
        icon: (
          <img src={darkMode ? dashboard : dashboardDark} height={"20px"} />
        ),
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: "true",
      },
            {
        title: "Payment",
        path: "/paymenthistory",
        icon: (
          <img src={darkMode ? dashboard : dashboardDark} height={"20px"} />
        ),
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: "true",
      },
    ];
  }
   else {
    return [];
  }
};
