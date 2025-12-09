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
import adpanel from "../../../images/SliderBanner/ad-panel.png";
import adpanelDark from "../../../images/SliderBanner/ad-panel_dark.png";
import payment from "../../../images/SliderBanner/payment.png";
import paymentDark from "../../../images/SliderBanner/payment_dark.png";
import { useSelector } from "react-redux";
export const SidebarData = (darkMode) => {
  const reduxRole = useSelector((state) => state.layout.role);
  const loginedDetails = JSON.parse(sessionStorage.getItem("loggedInDetails"));
  const role = reduxRole || loginedDetails?.role;
  const reduxRights = useSelector((state) => state?.layout?.rights);
  const rights = reduxRights || loginedDetails?.master_rights;

  const getAccessLevel = (contentName) => {
    if (!rights || !Array.isArray(rights)) {
      console.log("Rights is not an array or undefined");
      return "All Access"; // Default for Admin
    }

    const right = rights?.find((r) => r.content === contentName);
    console.log(
      `Access for ${contentName}:`,
      right?.content_value || "Not Found"
    );
    return right?.content_value || "All Access";
  };
  // console.log(getAccessLevel("Movies"), "getAccessLevel77");
  // Helper function to check if route is accessible
  const isAccessible = (contentName) => {
    const accessLevel = getAccessLevel(contentName);
    return accessLevel !== "No Access";
  };

  if (role == "Admin" || role == "Sub Admin") {
    return [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: (
          <img src={darkMode ? dashboard : dashboardDark} height={"20px"} />
        ),
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: getAccessLevel("Dashboard"),
        contentName: "Dashboard",
      },
      {
        title: "Analytics",
        path: "/analytics",
        icon: (
          <img src={darkMode ? analytics : analyticsDark} height={"20px"} />
        ),
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: getAccessLevel("Analytics"),
        contentName: "Analytics",
      },

      {
        title: "Content",
        path: "/Movie/",
        icon: <img src={darkMode ? content : contentDark} height={"20px"} />,
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: "true",
        subNav: [
          {
            title: "Movie",
            path: "/movie",
            access: getAccessLevel("Movies"),
            contentName: "Movies",
          },
          {
            title: "Live Stream",
            path: "/livestream",
            access: getAccessLevel("Live Stream"),
            contentName: "Live Stream",
          },
          {
            title: "Coming Soon",
            path: "/comingsoon",
            access: getAccessLevel("Coming Soon"),
            contentName: "Coming Soon",
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
        access: "true",
        subNav: [
          {
            title: "Series",
            path: "/series",
            access: getAccessLevel("Series"),
            contentName: "Series",
          },
          {
            title: "Season",
            path: "/season",
            access: getAccessLevel("Season"),
            contentName: "Season",
          },
          {
            title: "Episode",
            path: "/episode",
            access: getAccessLevel("Episode"),
            contentName: "Episode",
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
        access: "true",
        subNav: [
          {
            title: "Create Profile",
            path: "/distributor",
            access: getAccessLevel("Content Owner"),
            contentName: "Content Owner",
          },
          // {
          //   title: "Acruired Content",
          //   path: "/contentform",
          //   access: rights?.["Web Series"]?.["view"],
          // },
          {
            title: "Content Leaving",
            path: "/leavingsoon",
            access: getAccessLevel("Content Leaving Soon"),
            contentName: "Content Leaving Soon",
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
            access: getAccessLevel("Slider"),
            contentName: "Slider",
          },
          // {
          //   title: "Song Slider",
          //   path: "/songslider",
          //   access: rights?.["Web Series"]?.["view"],
          // },
          {
            title: "Promotion",
            path: "/promotion",
            access: getAccessLevel("Promotions"),
            contentName: "Promotions",
          },
          {
            title: "Top Ten Video",
            path: "/toptenvideos",
            access: getAccessLevel("Top Ten Video"),
            contentName: "Top Ten Video",
          },
        ].filter((e) => e),
      },
      {
        title: "Customers",
        path: "/Customer/",
        icon: <img src={darkMode ? customer : customerDark} height={"20px"} />,
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: "true",
        subNav: [
          {
            title: "All Customer",
            path: "/customer/",
            access: getAccessLevel("Customers"),
            contentName: "Customers",
          },
          // {
          //   title: "Premium Customer",
          //   path: "/Customer/PremiumCustomer/",
          //   access:  rights?.["Premium Customers"]?.["view"],
          // },
          {
            title: "Complaints",
            path: "/complaints",
            access: getAccessLevel("Complaints"),
            contentName: "Complaints",
          },
          // {
          //   title: "Promocode",
          //   path: "/promocode",
          //   access: rights?.["Customers"]?.["view"],
          // },
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
        access: getAccessLevel("Transactions"),
        contentName: "Transactions",
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
        access: getAccessLevel("Subscriptions"),
        contentName: "Subscriptions",
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
        icon: <img src={darkMode ? adpanel : adpanelDark} height={"20px"} />,
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: getAccessLevel("Ad Master"),
        contentName: "Ad Master",
        subNav: [
          // {
          //   title: "Ad Submission",
          //   path: "/AdForm/AdForm/",
          //   access: rights?.["Ad Submission"]?.["view"],
          // },
          {
            title: "Advertisers",
            path: "/advertiser",
            access: getAccessLevel("Ad Master"),
            contentName: "Ad Master",
          },
          {
            title: "Advertisements",
            path: "/advertisement/",
            access: getAccessLevel("Ad Master"),
            contentName: "Ad Master",
          },
          {
            title: "Ad Payment",
            path: "/adpayment",
            access: getAccessLevel("Ad Master"),
            contentName: "Ad Master",
          },
          // {
          //   title: "Set Ads ( Series )",
          //   path: "/SetSeriesAdvertisement/SetSeriesAdvertisement/",
          //   access: rights?.["Set Series Advertisement"]?.["view"],
          // },
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
        access: getAccessLevel("Control Panel"),
        contentName: "Control Panel",

        subNav: [
          // role != "Distributor" && {
          //   title: "Avatar",
          //   path: "/Masters/Avatar/Avatar/",
          //   access: rights?.["Masters"]?.["view"],
          // },
          {
            title: "Category",
            path: "/masters/category/",
            access: getAccessLevel("Control Panel"),
            contentName: "Control Panel",
          },
          {
            title: "Sub Category",
            path: "/masters/subcategory",
            access: getAccessLevel("Control Panel"),
            contentName: "Control Panel",
          },
          {
            title: "Language",
            path: "/masters/language/",
            access: getAccessLevel("Control Panel"),
            contentName: "Control Panel",
          },
          {
            title: "Cast",
            path: "/masters/cast/",
            access: getAccessLevel("Control Panel"),
            contentName: "Control Panel",
          },
          {
            title: "Country",
            path: "/masters/country/",
            access: getAccessLevel("Control Panel"),
            contentName: "Control Panel",
          },
          // {
          //   title: "Song Category",
          //   path: "/masters/songcategory/",
          //   access: rights?.["Masters"]?.["view"],
          // },
          {
            title: "Complaint Type",
            path: "/masters/complainttype/",
            access: getAccessLevel("Control Panel"),
            contentName: "Control Panel",
          },
          {
            title: "Live Stream Category",
            path: "/masters/livestreamcategory/",
            access: getAccessLevel("Control Panel"),
            contentName: "Control Panel",
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
            access: getAccessLevel("Control Panel"),
            contentName: "Control Panel",
          },
         role == "Admin" && {
            title: "Sub Admin",
            path: "/masters/subadmin",
            access: getAccessLevel("Control Panel"),
            contentName: "Control Panel",
          },
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
        access: getAccessLevel("Setting"),
        contentName: "Setting",
        subNav: [
          {
            title: "About Us",
            path: "/setting/aboutus/",
            access: getAccessLevel("Setting"),
            contentName: "Setting",
          },

          {
            title: "Privacy Policy",
            path: "/setting/privacypolicy/",
            access: getAccessLevel("Setting"),
            contentName: "Setting",
          },
          {
            title: "Terms & Conditions",
            path: "/setting/termsconditions/",
            access: getAccessLevel("Setting"),
            contentName: "Setting",
          },
          {
            title: "Refund Policy",
            path: "/setting/refundpolicy/",
            access: getAccessLevel("Setting"),
            contentName: "Setting",
          },

          {
            title: "Ad Price",
            path: "/setting/adprice/",
            access: getAccessLevel("Setting"),
            contentName: "Setting",
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
      // {
      //   title: "Submit Content",
      //   path: "/contentform",
      //   icon: (
      //     <img
      //       src={darkMode ? content_owner : content_ownerDark}
      //       height={"20px"}
      //     />
      //   ),
      //   iconClosed: <KeyboardArrowRightIcon />,
      //   iconOpened: <KeyboardArrowDownIcon />,
      //   access: rights?.["Movie Submission"]?.["view"],
      // },
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
      // {
      //   title: "Coupon",
      //   path: "/distributorcoupon",
      //   icon: <img src={darkMode ? customer : customerDark} height={"20px"} />,
      //   iconClosed: <KeyboardArrowRightIcon />,
      //   iconOpened: <KeyboardArrowDownIcon />,
      //   access: rights?.["Movie Submission"]?.["view"],
      // },
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
        icon: <img src={darkMode ? adpanel : adpanelDark} height={"20px"} />,
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: "true",
      },
      {
        title: "Payment",
        path: "/paymenthistory",
        icon: <img src={darkMode ? payment : paymentDark} height={"20px"} />,
        iconClosed: <KeyboardArrowRightIcon />,
        iconOpened: <KeyboardArrowDownIcon />,
        access: "true",
      },
    ];
  } else {
    return [];
  }
};
