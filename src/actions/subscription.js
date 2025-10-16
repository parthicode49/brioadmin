import { MESSAGE, SUBSCRIPTIONS } from "./../constants/actionTypes";
import * as api from "./../api/index.js";

export const subscription_create = (formData) => async (dispatch) => {
  try {
    const data = await api.subscription_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const subscription_update = (formData) => async (dispatch) => {
  try {
    const  data  = await api.subscription_update(formData);
     dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const subscription_status_update = (formData) => async (dispatch) => {
  try {
    const { data } = await api.subscription_status_update(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const subscription_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.subscription_delete(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const all_subscription_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_subscription_list(formData);

    dispatch({ type: SUBSCRIPTIONS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
