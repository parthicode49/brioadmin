import {
  MESSAGE,
  ADVERTISEMENTS,
  ADPAYMENT,
  ADPAY,
  ADVERTISEMENTSADLIST,
} from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const advertisement_create = (formData) => async (dispatch) => {
  try {
    const  data  = await api.advertisement_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });

    return data;
  } catch (error) {
     dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const advertisement_update = (formData) => async (dispatch) => {
  try {
    const  data  = await api.advertisement_update(formData);
      dispatch({ type: MESSAGE, payload:data?.data });
     return data;
   
  } catch (error) {
    console.log(error);
  }
};
export const advertisement_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.advertisement_delete(formData);
      dispatch({ type: MESSAGE, payload:data?.data });
     return data;
   
  } catch (error) {
    console.log(error);
  }
};
export const all_advertisement_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_advertisement_list(formData);

    dispatch({ type: ADVERTISEMENTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const advertisement_list_advertiser = (formData) => async (dispatch) => {
  try {
    const { data } = await api.advertisement_list_advertiser(formData);

    dispatch({ type: ADVERTISEMENTSADLIST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const all_advertise_transaction_list =
  (formData) => async (dispatch) => {
    try {
      const { data } = await api.all_advertise_transaction_list(formData);
      dispatch({ type: ADPAY, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
