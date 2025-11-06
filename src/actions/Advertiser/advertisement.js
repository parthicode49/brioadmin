import {
  MESSAGE,
  ADVERTISEMENTS,
  ADPAYMENT,
  ADPAY,
  ADVERTISEMENTSADLIST,
  ADPRICE,
  ADPAYMENTHISTORY,
  ADPAYMENTHISTORYDIS,
  ADDVIEW,
  ADDDASHBOARD,
} from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const advertisement_create = (formData) => async (dispatch) => {
  try {
    const data = await api.advertisement_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });

    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};


export const advertisement_update = (formData) => async (dispatch) => {
  try {
    const data = await api.advertisement_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const advertisement_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.advertisement_delete(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const advertisement_status_update = (formData) => async (dispatch) => {
  try {
    const  data  = await api.advertisement_status_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const advertisement_payment_create = (formData) => async (dispatch) => {
  try {
    const data = await api.advertisement_payment_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });

    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const advertisement_payment_list_admin = (formData) => async (dispatch) => {
  try {
    const data = await api.advertisement_payment_list_admin(formData);
    dispatch({ type: ADPAYMENTHISTORY, payload: data?.data });

    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const advertisement_payment_list_advertiser = (formData) => async (dispatch) => {
  try {
    const data = await api.advertisement_payment_list_advertiser(formData);
    dispatch({ type: ADPAYMENTHISTORYDIS, payload: data?.data });

    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const all_advertisement_list_admin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_advertisement_list_admin(formData);

    dispatch({ type: ADVERTISEMENTS, payload: data });
    return data
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

export const advertisement_charge_list =
  (formData) => async (dispatch) => {
    try {
      const { data } = await api.advertisement_charge_list(formData);
      dispatch({ type: ADPRICE, payload: data });
      return data
    } catch (error) {
      console.log(error);
    }
  };

export const advertisement_charge_update =
  (formData) => async (dispatch) => {
    try {
      const  data  = await api.advertisement_charge_update(formData);
      dispatch({ type: MESSAGE, payload: data?.data });
      return data
    } catch (error) {
      console.log(error);
    }
  };
export const advertisement_view_data =
  (formData) => async (dispatch) => {
    try {
      const  data  = await api.advertisement_view_data(formData);
      dispatch({ type: ADDVIEW, payload: data?.data });
      return data
    } catch (error) {
      console.log(error);
    }
  };
export const advertisement_highest_view =
  (formData) => async (dispatch) => {
    try {
      const  data  = await api.advertisement_highest_view(formData);
      dispatch({ type: ADDDASHBOARD, payload: data?.data });
      return data
    } catch (error) {
      console.log(error);
    }
  };
