import { MESSAGE, LIVESTRCATEGORIES } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const create_live_stream_category = (formData) => async (dispatch) => {
  try {
    const data = await api.create_live_stream_category(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    console.log(error);
     dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const update_live_stream_category = (formData) => async (dispatch) => {
  try {
    const data = await api.update_live_stream_category(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const delete_live_stream_category = (formData) => async (dispatch) => {
  try {
    const { data } = await api.delete_live_stream_category(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const update_live_stream_category_status = (formData) => async (dispatch) => {
  try {
    const { data } = await api.update_live_stream_category_status(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const live_stream_category_list = (formData) => async (dispatch) => {
  try {
    const data = await api.live_stream_category_list(formData);
    dispatch({ type: LIVESTRCATEGORIES, payload: data?.data });
    return data;
  } catch (error) {
    console.log(error);
     dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
