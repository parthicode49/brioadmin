import {
  MESSAGE,
  SLIDER_BANNERS,
  SONG_SLIDER_BANNERS,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const sliderbanner_create = (formData) => async (dispatch) => {
  try {
    const data = await api.sliderbanner_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const sliderbanner_update = (formData) => async (dispatch) => {
  try {
    const data = await api.sliderbanner_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const slide_banner_status_update = (formData) => async (dispatch) => {
  try {
    const { data } = await api.slide_banner_status_update(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const sliderbanner_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.sliderbanner_delete(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const all_sliderbanner_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_sliderbanner_list(formData);

    dispatch({ type: SLIDER_BANNERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const song_sliderbanner_create = (formData) => async (dispatch) => {
  try {
    const data = await api.song_sliderbanner_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const song_slider_banner_update = (formData) => async (dispatch) => {
  try {
    const data = await api.song_slider_banner_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const song_slide_banner_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.song_slide_banner_delete(formData);

    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const song_slide_banner_status_update =
  (formData) => async (dispatch) => {
    try {
      const { data } = await api.song_slide_banner_status_update(formData);

      dispatch({ type: MESSAGE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
export const all_song_sliderbanner_list_admin =
  (formData) => async (dispatch) => {
    try {
      const { data } = await api.all_song_sliderbanner_list_admin(formData);

      dispatch({ type: SONG_SLIDER_BANNERS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
