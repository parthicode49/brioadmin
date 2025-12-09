import {
  MESSAGE,
  NOTIFICATIONS,
  NOTIFICATIONS_COUNT,
  NOTIFICATION_READ,
  NOTIFICATION_MASK,
  NOTIFICATION_DISTRIBUTOR,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const notification_create = (formData) => async (dispatch) => {
  try {
    const data = await api.notification_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const notification_update = (formData) => async (dispatch) => {
  try {
    const { data } = await api.notification_update(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const notification_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.notification_delete(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const all_notification_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_notification_list(formData);

    dispatch({ type: NOTIFICATIONS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const distributor_unread_count = (formData) => async (dispatch) => {
  try {
    const { data } = await api.distributor_unread_count(formData);

    dispatch({ type: NOTIFICATIONS_COUNT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const notification_read_status_update =
  (formData) => async (dispatch) => {
    try {
      const  data  = await api.notification_read_status_update(formData);
      dispatch({ type: NOTIFICATION_READ, payload: data });
      return data
    } catch (error) {
       dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
    }
  };
export const notification_create_mask = (formData) => async (dispatch) => {
  try {
    const { data } = await api.notification_create_mask(formData);
    dispatch({ type: NOTIFICATION_MASK, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const distributor_notification_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.distributor_notification_list(formData);
    dispatch({ type: NOTIFICATION_DISTRIBUTOR, payload: data });
  } catch (error) {
    console.log(error);
  }
};
