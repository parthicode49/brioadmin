import { CONTENT_FORM, DISTRIBUTOR_MOVIE, DISTRIBUTOR_PROMOCODE, DISTRIBUTOR_SERIES, DISTRIBUTOR_SONG, MESSAGE } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const distributor_content_submission_create =
  (formData) => async (dispatch) => {
    try {
      const data = await api.distributor_content_submission_create(formData);
      dispatch({ type: MESSAGE, payload: data?.data });
      return data;
    } catch (error) {
      dispatch({ type: MESSAGE, payload: error?.response?.data });
      return error?.response?.data;
    }
  };
export const distributor_content_update =
  (formData) => async (dispatch) => {
    try {
      const data = await api.distributor_content_update(formData);
      dispatch({ type: MESSAGE, payload: data?.data });
      return data;
    } catch (error) {
      dispatch({ type: MESSAGE, payload: error?.response?.data });
      return error?.response?.data;
    }
  };
export const all_distributor_content_submission_list =
  (formData) => async (dispatch) => {
    try {
      const data = await api.all_distributor_content_submission_list(formData);
      dispatch({ type: CONTENT_FORM, payload: data?.data });
      return data;
    } catch (error) {
      dispatch({ type: MESSAGE, payload: error?.response?.data });
      return error?.response?.data;
    }
  };
export const all_distributor_movie_list =
  (formData) => async (dispatch) => {
    try {
      const data = await api.all_distributor_movie_list(formData);
      dispatch({ type: DISTRIBUTOR_MOVIE, payload: data?.data });
      return data;
    } catch (error) {
      dispatch({ type: MESSAGE, payload: error?.response?.data });
      return error?.response?.data;
    }
  };
export const all_distributor_series_list =
  (formData) => async (dispatch) => {
    try {
      const data = await api.all_distributor_series_list(formData);
      dispatch({ type: DISTRIBUTOR_SERIES, payload: data?.data });
      return data;
    } catch (error) {
      dispatch({ type: MESSAGE, payload: error?.response?.data });
      return error?.response?.data;
    }
  };
export const all_distributor_song_list =
  (formData) => async (dispatch) => {
    try {
      const data = await api.all_distributor_song_list(formData);
      dispatch({ type: DISTRIBUTOR_SONG, payload: data?.data });
      return data;
    } catch (error) {
      dispatch({ type: MESSAGE, payload: error?.response?.data });
      return error?.response?.data;
    }
  };
export const all_promocode_list_distributor =
  (formData) => async (dispatch) => {
    try {
      const data = await api.all_promocode_list_distributor(formData);
      dispatch({ type: DISTRIBUTOR_PROMOCODE, payload: data?.data });
      return data;
    } catch (error) {
      dispatch({ type: MESSAGE, payload: error?.response?.data });
      return error?.response?.data;
    }
  };
