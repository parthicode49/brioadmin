import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./Routes/PublicRoutes";
import { usePrivateRoutes } from "./Routes/usePrivateRoutes";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "./Layout/Layout";
import { Fragment, Suspense, useEffect } from "react";
import "./App.css";
import "./styles/remixicon.css";
import "react-tabs/style/react-tabs.css";
import "swiper/css";
import "swiper/css/bundle";

// Chat Styles
import "./styles/chat.css";
// Globals Styles
import "./styles/globals.css";
// Rtl Styles
import "./styles/rtl.css";
// Dark Mode Styles
import "./styles/dark.css";
// Left Sidebar Dark Mode Styles
import "./styles/leftSidebarDark.css";
// Theme Styles
import theme from "./styles/theme";
import {
  ADVERTISER,
  DISTRIBUTOR,
  LOGGEDIN,
  PROFILE,
  RIGHTS,
  ROLE,
} from "./constants/actionTypes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Loader from "./components/Loader/loader";
import * as Action from "./actions/authenticate";
import { bindActionCreators } from "redux";

function App() {
  const isLoggedIn = useSelector((state) => state.layout.loggedin);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { login, distributor_login } = bindActionCreators(Action, dispatch);
  // const data = JSON.parse(
  //   sessionStorage.getItem("loggedInDetails") == undefined
  //     ? "{}"
  //     : sessionStorage.getItem("loggedInDetails")
  // );
  // console.log(data?.role, "DAta 123");
  // useEffect(() => {
  //   const checkUser = async () => {
  //     const loginDetails = JSON.parse(sessionStorage.getItem("loginDetails"));
  //     // Dispatch login manually, DO NOT bind it

  //     const user_role = data?.role;
  //     const resData =
  //       (await user_role) === "Distributor"
  //         ? distributor_login(
  //             JSON.parse(sessionStorage.getItem("loginDetails"))
  //           )
  //         : login(JSON.parse(sessionStorage.getItem("loginDetails")));
  //     console.log("Login result:", resData); // ✅ Check what's returned

  //     console.log(resData, "mdsfnjnsfndfsd");

  //     if (resData?.status == 200) {
  //       console.log(resData, "ffdfjfsdfdsfnsfjdfjdsf");

  //       dispatch({ type: PROFILE, payload: resData?.data?.data });
  //       dispatch({ type: LOGGEDIN, payload: true });
  //       dispatch({ type: ROLE, payload: resData?.data?.data?.role });
  //       // localStorage.setItem("profile", JSON.stringify(data?.id));
  //       // localStorage.setItem("advertiser", JSON.stringify(data?.advertiser[0]));
  //       // localStorage.setItem("distributor", JSON.stringify(data?.distributor[0]));
  //       // localStorage.setItem("rights", JSON.stringify(data?.Rights[0]));
  //       // localStorage.setItem("role", JSON.stringify(data?.id?.userType?.roleName));
  //       // localStorage.setItem("loggedIn", "true");
  //       sessionStorage.setItem(
  //         "loggedInDetails",
  //         JSON.stringify(resData?.data?.data)
  //       );
  //       // sessionStorage.setItem("remember_me", data?.get("remember_me"))
  //       sessionStorage.setItem("loginDetails", JSON.stringify(loginDetails));
  //       // window.location.reload(false)
  //       // console.log(data,"lplp")
  //       //    if(resData?.is_login_first_time==false)
  //       //    {
  //       //   //  data.advertiser != "" ? navigate("/AdForm/AdForm/",{state:{forceShow:true}}) :
  //       //   setTimeout(()=>{

  //       //     navigate("/Dashboard",{state:{forceShow:true}})
  //       //   },1000)
  //       // }
  //       //     else
  //       //     navigate("/Authentication/ChangePassword",{state:{forceShow:true}})
  //     } else {
  //       sessionStorage.setItem("loggedInDetails", "{}");
  //       sessionStorage.setItem("loginDetails", null);
  //       // navigate("/",{state:{forceShow:true}})
  //       console.log("Login failed");
  //     }
  //   };
  //   if (data && Object.keys(data).length > 0) {
  //     console.log("Calling checkUser because data is non-empty", data);
  //     checkUser();
  //   }
  // }, []);
  // useEffec
  const privateRoutes = usePrivateRoutes();

  return (
    <div className="App">
      <BrowserRouter basename="/">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Public Routes */}
              {PublicRoutes?.map(({ path, Component }, i) => (
                <Route key={i} path={path} element={Component} />
              ))}

              {/* Private Routes under Layout */}
              <Route path="/" element={<AppLayout />}>
                {privateRoutes?.map(({ path, Component }, i) => (
                  <Route key={i} path={path} element={Component} />
                ))}
              </Route>

              {/* Catch-all route (optional) */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
