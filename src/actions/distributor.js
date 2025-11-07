import {
  MESSAGE,
  DISTRIBUTORS,
  DISTRIBUTORS_FORM_LIST,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const distributor_create = (formData) => async (dispatch) => {
  try {
    const data = await api.distributor_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const distributor_update = (formData) => async (dispatch) => {
  try {
    const data = await api.distributor_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    console.log(error , "Dfdsfdfdsfdsdsfsdfds")
    return error?.response?.data;
  }
};
export const distributor_status_update = (formData) => async (dispatch) => {
  try {
    const { data } = await api.distributor_status_update(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const distributor_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.distributor_delete(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const all_distributor_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_distributor_list(formData);

    dispatch({ type: DISTRIBUTORS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const all_distributor_content_submission_list_admin =
  (formData) => async (dispatch) => {
    try {
      const { data } = await api.all_distributor_content_submission_list_admin(
        formData
      );

      dispatch({ type: DISTRIBUTORS_FORM_LIST, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
export const distributor_content_submission_update =
  (formData) => async (dispatch) => {
    try {
      const data = await api.distributor_content_submission_update(formData);
      dispatch({ type: MESSAGE, payload: data?.data });
      return data;
    } catch (error) {
      dispatch({ type: MESSAGE, payload: error?.response?.data });
      return error?.response?.data;
    }
  };
