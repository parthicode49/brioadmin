import {
  MESSAGE,
  EPISODES,
  EPISODE,
  EPISODE_WATCH_USER,
  EPSUBTITLEDELETE,
  EPAUDIOFILEDELETE,
  EPISODE_LIST_LOADING,
} from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const episode_create = (formData) => async (dispatch) => {
  try {
    const data = await api.episode_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const episode_update = (formData) => async (dispatch) => {
  try {
    const data = await api.episode_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const episode_status_update = (formData) => async (dispatch) => {
  try {
    const { data } = await api.episode_status_update(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const episode_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.episode_delete(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const all_episode_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_episode_list(formData);

    dispatch({ type: EPISODES, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const episode_details = (formData) => async (dispatch) => {
  try {
    const { data } = await api.episode_details(formData);
    dispatch({ type: EPISODE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const episode_watch_user_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.episode_watch_user_list(formData);
    dispatch({ type: EPISODE_WATCH_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const episode_audio_file_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.episode_audio_file_delete(formData);
    dispatch({ type: EPAUDIOFILEDELETE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const episode_subtitle_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.episode_subtitle_delete(formData);
    dispatch({ type: EPSUBTITLEDELETE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const all_episode_list_admin_loadless =
  (formData) => async (dispatch) => {
    try {
      const { data } = await api.all_episode_list_admin_loadless(formData);
      dispatch({ type: EPISODE_LIST_LOADING, payload: data });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
