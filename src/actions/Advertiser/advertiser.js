import { MESSAGE, ADVERTISERS, ADPAYMENT } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const advertiser_create = (formData) => async (dispatch) => {
  try {
    const data = await api.advertiser_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const advertiser_update = (formData) => async (dispatch) => {
  try {
    const data = await api.advertiser_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const advertiser_status_update = (formData) => async (dispatch) => {
  try {
    const { data } = await api.advertiser_status_update(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const advertiser_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.advertiser_delete(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const all_advertiser_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_advertiser_list(formData);

    dispatch({ type: ADVERTISERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
