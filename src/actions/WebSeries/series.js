import {
  MESSAGE,
  SERIES,
  SERIES_LIST_LOADING,
  SERIESDETAILS,
  SERIESNAME,
} from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const series_create = (formData) => async (dispatch) => {
  try {
    const data = await api.series_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const series_update = (formData) => async (dispatch) => {
  try {
    const data = await api.series_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const series_status_update = (formData) => async (dispatch) => {
  try {
    const { data } = await api.series_status_update(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const series_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.series_delete(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const all_series_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_series_list(formData);

    dispatch({ type: SERIES, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const series_details_admin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.series_details_admin(formData);
    dispatch({ type: SERIESDETAILS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const only_series_name = (formData) => async (dispatch) => {
  try {
    const { data } = await api.only_series_name(formData);
    dispatch({ type: SERIESNAME, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const all_series_list_admin_loadless =
  (formData) => async (dispatch) => {
    try {
      const { data } = await api.all_series_list_admin_loadless(formData);
      dispatch({ type: SERIES_LIST_LOADING, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
