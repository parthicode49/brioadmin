import { MESSAGE, SONG_LIST, SONG_DETAIL, SONG_WATCH_USER, SONG_NAME_LIST } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const song_create = (formData) => async (dispatch) => {
  try {
    const data = await api.song_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const song_update = (formData) => async (dispatch) => {
  try {
    const data = await api.song_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const song_status_update = (formData) => async (dispatch) => {
  try {
    const { data } = await api.song_status_update(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const song_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.song_delete(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const all_song_list_admin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_song_list_admin(formData);
    dispatch({ type: SONG_LIST, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const song_detail_admin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.song_detail_admin(formData);
    dispatch({ type: SONG_DETAIL, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const song_watch_user_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.song_watch_user_list(formData);
    dispatch({ type: SONG_WATCH_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const song_name_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.song_name_list(formData);
    dispatch({ type: SONG_NAME_LIST, payload: data });
  } catch (error) {
    console.log(error);
  }
};
