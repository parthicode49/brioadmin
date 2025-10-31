import {
  MESSAGE,
  MOVIES,
  MOVIE,
  MOVIE_WATCH_USER,
  SUBTITLEDELETE,
  AUDIOFILEDELETE,
  MOVIENAMELIST,
  MOVIELISTLOADING,
  DISMOVIES,
} from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const movie_create = (formData) => async (dispatch) => {
  try {
    const data = await api.movie_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const movie_update = (formData) => async (dispatch) => {
  try {
    const data = await api.movie_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const movie_status_update = (formData) => async (dispatch) => {
  try {
    const { data } = await api.movie_status_update(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const movie_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.movie_delete(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const all_movie_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_movie_list(formData);
    dispatch({ type: MOVIES, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const all_movie_list_distributor = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_movie_list_distributor(formData);
    dispatch({ type: DISMOVIES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const movie_details = (formData) => async (dispatch) => {
  try {
    const { data } = await api.movie_details(formData);
    dispatch({ type: MOVIE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const movie_watch_user_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.movie_watch_user_list(formData);
    dispatch({ type: MOVIE_WATCH_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const subtitle_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.subtitle_delete(formData);
    dispatch({ type: SUBTITLEDELETE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const audio_file_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.audio_file_delete(formData);
    dispatch({ type: AUDIOFILEDELETE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const all_movie_name_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_movie_name_list(formData);
    dispatch({ type: MOVIENAMELIST, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const all_movie_list_admin_loadless = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_movie_list_admin_loadless(formData);
    dispatch({ type: MOVIELISTLOADING, payload: data });
  } catch (error) {
    console.log(error);
  }
};
