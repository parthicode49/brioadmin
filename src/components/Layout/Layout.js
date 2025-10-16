// import React, { useState, useMemo } from "react";
// import LeftSidebar from "./LeftSidebar";
// import TopNavbar from "./TopNavbar";
// import BreadCrumb from "./BreadCrumb";
// import ScrollToTop from "./ScrollToTop";
// import { useSelector, useDispatch } from "react-redux";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import Footer from "./Footer";
// import { useLocation, useNavigate } from "react-router-dom";
// import { MESSAGE } from "./../../constants/actionTypes";

// const Layout = ({ children }) => {
//   const role = useSelector((state) => state.layout.role);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   // const [active, setActive] = useState(role == "Advertiser");
//   // useMemo(() => {
//   //   setActive(role == "Advertiser");
//   // }, [role]);
//   const toogleActive = () => {
//     // setActive(!active);
//   };
//   const message = useSelector((state) => state.layout.message);
//   const [open, setOpen] = useState(false);
//   useMemo(() => {
//     if (message?.message != undefined) {
//       setOpen(true);
//     }
//     if (
//       location?.state?.forceShow &&
//       message?.message != "" &&
//       message?.message != undefined
//     ) {
//       setOpen(true);
//     }
//   }, [message?.message]);
//   const handleClose = () => {
//     setOpen(false);

//     dispatch({ type: MESSAGE, payload: undefined });
//   };
//   const isLoggedIn = useSelector((state) => state.layout.loggedin);
//   if (isLoggedIn == true)
//     return (
//       <>
//         <div className={`main-wrapper-content ${active && "active"}`}>
//           <>
//             <TopNavbar toogleActive={toogleActive} />
//             {<BreadCrumb />}
//             {
//               <LeftSidebar toogleActive={toogleActive} />
//           }
//           </>

//           <div
//             className="main-content"
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               minHeight: "88.4vh",
//               margin: "0",
//             }}
//           >
//             <div style={{ flex: "1" }}>{children}</div>

//             <Footer />
//           </div>
//         </div>

//         <ScrollToTop />

//         <Snackbar
//           anchorOrigin={{ vertical: "top", horizontal: "center" }}
//           open={open}
//           autoHideDuration={3000}
//           onClose={handleClose}
//         >
//           <Alert severity="info" variant="filled" color="success">
//             {message?.message}
//           </Alert>
//         </Snackbar>
//       </>
//     );
//   else navigate("/Authentication");
// };

// export default Layout;

// New code

import React, { useState, useMemo, useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import TopSidebar from "./TopSidebar";
import TopNavbar from "./TopNavbar";
import BreadCrumb from "./BreadCrumb";
import ScrollToTop from "./ScrollToTop";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LOGGEDIN,
  MESSAGE,
  PROFILE,
  ROLE,
} from "./../../constants/actionTypes";
import { distributor_unread_count } from "../../actions/notification";
import email from "../../images/email.png";
import * as Action from "../../actions/authenticate";
import { bindActionCreators } from "redux";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login , distributor_login } = bindActionCreators(Action, dispatch);
  const [active, setActive] = useState(true);
 const [darkMode, setDarkMode] = useState(() => {
  const storedMode = sessionStorage.getItem("darkMode");
  return storedMode === "true"; // fallback to false if null
});
const userAgent = window.navigator.userAgent;
const platform = window.navigator.platform;
const randomString = Math.random().toString(20).substring(2, 14) + Math.random().toString(20).substring(2, 14);

const deviceID = `${userAgent}-${platform}-${randomString}`;
console.log(deviceID ,"sdfdsmkfdfdfklsfklsf")
  const user = useSelector((state) => state.layout.profile);
  const role = useSelector((state) => state.layout.role);
  const [isLogin, setIsLogin] = useState(true);
  console.log(role , "darkMode123")
  const toogleActive = () => {
    setActive(!active);
  };
  const message = useSelector((state) => state.layout.message);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const checkUser = async () => {
      const loginDetails = JSON.parse(sessionStorage.getItem("loginDetails"));
      const loginedDetails = JSON.parse(sessionStorage.getItem("loggedInDetails"));
      console.log( loginedDetails?.role ,"fddfdsds")

      // Dispatch login manually, DO NOT bind it
      if(loginedDetails?.role == "Distributor"){

        const resData = await distributor_login(
          JSON.parse(sessionStorage.getItem("loginDetails"))
        );
        console.log("Login result:", resData); // ✅ Check what's returned
  
        console.log(resData, "mdsfnjnsfndfsd");
  
        if (resData?.status == 200) {
          dispatch({ type: PROFILE, payload: resData?.data?.data });
          dispatch({ type: LOGGEDIN, payload: true });
          console.log(resData, "ffdfjfsdfdsfnsfjdfjdsf");
          setIsLogin(true);
          dispatch({ type: ROLE, payload: resData?.data?.data?.role });
          // localStorage.setItem("profile", JSON.stringify(data?.id));
          // localStorage.setItem("advertiser", JSON.stringify(data?.advertiser[0]));
          // localStorage.setItem("distributor", JSON.stringify(data?.distributor[0]));
          // localStorage.setItem("rights", JSON.stringify(data?.Rights[0]));
          // localStorage.setItem("role", JSON.stringify(data?.id?.userType?.roleName));
          // localStorage.setItem("loggedIn", "true");
          sessionStorage.setItem(
            "loggedInDetails",
            JSON.stringify(resData?.data?.data)
          );
          // sessionStorage.setItem("remember_me", data?.get("remember_me"))
          sessionStorage.setItem("loginDetails", JSON.stringify(loginDetails));
          // window.location.reload(false)
          // console.log(data,"lplp")
          //    if(resData?.is_login_first_time==false)
          //    {
          //   //  data.advertiser != "" ? navigate("/AdForm/AdForm/",{state:{forceShow:true}}) :
          //   setTimeout(()=>{
  
          //     navigate("/Dashboard",{state:{forceShow:true}})
          //   },1000)
          // }
          //     else
          //     navigate("/Authentication/ChangePassword",{state:{forceShow:true}})
        } else {
          sessionStorage.setItem("loggedInDetails", "{}");
          setIsLogin(false);
          // navigate("/",{state:{forceShow:true}})
          console.log("Login failed");
        }
      }else{
                const resData = await login(
          JSON.parse(sessionStorage.getItem("loginDetails"))
        );
        console.log("Login result:", resData); // ✅ Check what's returned
  
        console.log(resData, "mdsfnjnsfndfsd");
  
        if (resData?.status == 200) {
          dispatch({ type: PROFILE, payload: resData?.data?.data });
          dispatch({ type: LOGGEDIN, payload: true });
          console.log(resData, "ffdfjfsdfdsfnsfjdfjdsf");
          setIsLogin(true);
          dispatch({ type: ROLE, payload: resData?.data?.data?.role });
          // localStorage.setItem("profile", JSON.stringify(data?.id));
          // localStorage.setItem("advertiser", JSON.stringify(data?.advertiser[0]));
          // localStorage.setItem("distributor", JSON.stringify(data?.distributor[0]));
          // localStorage.setItem("rights", JSON.stringify(data?.Rights[0]));
          // localStorage.setItem("role", JSON.stringify(data?.id?.userType?.roleName));
          // localStorage.setItem("loggedIn", "true");
          sessionStorage.setItem(
            "loggedInDetails",
            JSON.stringify(resData?.data?.data)
          );
          // sessionStorage.setItem("remember_me", data?.get("remember_me"))
          sessionStorage.setItem("loginDetails", JSON.stringify(loginDetails));
          // window.location.reload(false)
          // console.log(data,"lplp")
          //    if(resData?.is_login_first_time==false)
          //    {
          //   //  data.advertiser != "" ? navigate("/AdForm/AdForm/",{state:{forceShow:true}}) :
          //   setTimeout(()=>{
  
          //     navigate("/Dashboard",{state:{forceShow:true}})
          //   },1000)
          // }
          //     else
          //     navigate("/Authentication/ChangePassword",{state:{forceShow:true}})
        } else {
          sessionStorage.setItem("loggedInDetails", "{}");
          setIsLogin(false);
          // navigate("/",{state:{forceShow:true}})
          console.log("Login failed");
        }
      }
    };

    checkUser();
  }, []);

  useMemo(() => {
    if (message?.message != undefined) {
      setOpen(true);
    }
    if (
      location?.state?.forceShow &&
      message?.message != "" &&
      message?.message != undefined
    ) {
      setOpen(true);
    }
  }, [message?.message]);
  useMemo(() => {
    if (user?.id && role == "Distributor") {
      dispatch(distributor_unread_count({distributor_id : user?.id}));
    }
  }, [user?.id]);
  const count = useSelector(
    (state) => state.merchandise?.notifications_count?.data
  );
  useEffect(() => {
    if (count >= 1) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 6000);
    }
  }, [count]);

  const handleClose = () => {
    setOpen(false);

    dispatch({ type: MESSAGE, payload: undefined });
  };
  const isLoggedIn = useSelector((state) => state?.layout?.loggedin);
  console.log(isLoggedIn, "New Login Flow Is Testing");

  if (isLogin)
    return (
      <>
        <div className={`main-wrapper-content ${active && "active"}`}>
          <>
            <TopNavbar
              toogleActive={toogleActive}
              active={active}
              showToolTip={role != "Producer"}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
            {role != "Producer" && (
              <>
                {active && <TopSidebar darkMode={darkMode} />}
                {/* <BreadCrumb /> */}
                <LeftSidebar toogleActive={toogleActive} darkMode={darkMode} />
              </>
            )}
          </>

          <div
            className="main-content"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "85vh",
              margin: "0",
            }}
          >
            <div style={{ flex: "1" }}>{children}</div>

            <Footer />
          </div>
        </div>
        <ScrollToTop />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity="info" variant="filled" color="success">
            {message?.message}
          </Alert>
        </Snackbar>
        {show && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <div
              style={{
                backgroundColor: "transparent",
                background:
                  "linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%",
                color: "var(--tableHeadFontColor)",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "50px",
              }}
            >
              <p style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <img
                  src={email}
                  alt="msg"
                  height="22px"
                  style={{ marginRight: "10px" }}
                />{" "}
                New Message Received
              </p>
            </div>
          </Snackbar>
        )}
      </>
    );
  else navigate("/");
};

export default Layout;
