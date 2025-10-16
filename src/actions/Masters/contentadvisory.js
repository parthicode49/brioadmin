import { MESSAGE, ADVISORY } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const content_advisory_create = (formData) => async (dispatch) => {
  try {
    const data = await api.content_advisory_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const content_advisory_update = (formData) => async (dispatch) => {
  try {
    const data = await api.content_advisory_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const content_advisory_status_update =
  (formData) => async (dispatch) => {
    try {
      const { data } = await api.content_advisory_status_update(formData);
      dispatch({ type: MESSAGE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
export const content_advisory_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.content_advisory_delete(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const all_content_advisory_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_content_advisory_list(formData);

    dispatch({ type: ADVISORY, payload: data });
  } catch (error) {
    console.log(error);
  }
};
