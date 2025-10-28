import {
  MESSAGE,
  PROFILE,
  ADVERTISER,
  DISTRIBUTOR,
  RIGHTS,
  ROLE,
  LOGGEDIN,
  MESSAGEOTP,
  PRODUCER,
  MESSAGEOTPVERIFY,
  SUBADMIN,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const login = (formData, navigate) => async (dispatch) => {
  try {
    console.log("chech1452");
    const data = await api.login(formData);

    return data;
    // if(data?.status==200)
    // {

    //   dispatch({ type: PROFILE, payload:data?.data });
    //   // dispatch({ type: ADVERTISER, payload:data?.advertiser[0] });
    //   // dispatch({ type: PRODUCER, payload:data?.producer[0] });

    //   // dispatch({ type: DISTRIBUTOR, payload:data?.distributor[0] });
    //   // dispatch({ type: RIGHTS, payload:data?.Rights[0] });
    //   dispatch({ type: ROLE, payload:data?.data?.role });
    //   dispatch({ type: LOGGEDIN, payload:true });
    //   // localStorage.setItem("profile", JSON.stringify(data?.id));
    //   // localStorage.setItem("advertiser", JSON.stringify(data?.advertiser[0]));
    //   // localStorage.setItem("distributor", JSON.stringify(data?.distributor[0]));
    //   // localStorage.setItem("rights", JSON.stringify(data?.Rights[0]));
    //   // localStorage.setItem("role", JSON.stringify(data?.id?.userType?.roleName));
    //   // localStorage.setItem("loggedIn", "true");
    //   sessionStorage.setItem("loggedInDetails",JSON.stringify(data?.data))
    //   sessionStorage.setItem("remember_me",formData?.remember_me)
    //   sessionStorage.setItem("loginDetails",JSON.stringify(formData))
    //    navigate("/Dashboard",{state:{forceShow:true}})

    //   }else{

    //     console.log(data,"lplp")
    //   }
    //   // window.location.reload(false)
    // //  if(data?.data?.is_login_first_time==false)
    // //  {
    // //  data.advertiser != "" ? navigate("/AdForm/AdForm/",{state:{forceShow:true}}) :
    // //    navigate("/Dashboard",{state:{forceShow:true}})}
    // //   else
    // //   navigate("/Authentication/ChangePassword",{state:{forceShow:true}})
    // // }

    // dispatch({ type: MESSAGE, payload:data?.data });
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const distributor_login = (formData, navigate) => async (dispatch) => {
  try {
    const data = await api.distributor_login(formData);
    return data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};
export const advertiser_login = (formData, navigate) => async (dispatch) => {
  try {
    const data = await api.advertiser_login(formData);
    return data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};

export const forgot_password = (formData) => async (dispatch) => {
  try {
    const { data } = await api.forgot_password(formData);
    dispatch({ type: MESSAGEOTP, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const change_password = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.change_password(formData);
    dispatch({ type: MESSAGE, payload: data });
    localStorage.setItem("remember_me", "false");
    localStorage.setItem("loginDetails", "{}");
    localStorage.setItem("loggedInDetails", "{}");
    dispatch({ type: PROFILE, payload: {} });
    dispatch({ type: ADVERTISER, payload: {} });
    dispatch({ type: DISTRIBUTOR, payload: {} });
    // dispatch({type:SUBADMIN,payload:{}})
    dispatch({ type: RIGHTS, payload: {} });
    dispatch({ type: ROLE, payload: "" });
    dispatch({ type: LOGGEDIN, payload: false });
    navigate("/", { state: { forceShow: true } });
  } catch (error) {
    console.log(error);
  }
};

export const verify_otp = (formData) => async (dispatch) => {
  try {
    const { data } = await api.verify_otp(formData);
    dispatch({ type: MESSAGEOTPVERIFY, payload: data });
  } catch (error) {
    console.log(error);
  }
};
