import {
  HIGHEST_WATCHED_MOVIES_GRAPH,
  LOWEST_WATCHED_MOVIES,
  HIGHEST_SEARCHED_MOVIES_GRAPH,
  CURRENTLY_LOGGED_IN_USERS,
  CURRENTLY_WATCHING_USERS,
  DEVICE_USED_FOR_WATCHING,
  AREA_WISE_AD_VIEW,
  HIGHEST_WATCHED_SERIES_GRAPH,
  LOWEST_WATCHED_SERIES,
  HIGHEST_WATCHED_SONG_GRAPH,
  LOWEST_WATCHED_SONG
} from "./../constants/actionTypes";
import * as api from "./../api/index.js";
export const highest_watched_movies_graph = (formData) => async (dispatch) => {
  try {
    const { data } = await api.highest_watched_movies_graph(formData);

    dispatch({ type: HIGHEST_WATCHED_MOVIES_GRAPH, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const lowest_watched_movies = (formData) => async (dispatch) => {
  try {
    const { data } = await api.lowest_watched_movies(formData);

    dispatch({ type: LOWEST_WATCHED_MOVIES, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const highest_watched_series_graph = (formData) => async (dispatch) => {
  try {
    const { data } = await api.highest_watched_series_graph(formData);

    dispatch({ type: HIGHEST_WATCHED_SERIES_GRAPH, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const lowest_watched_series_graph = (formData) => async (dispatch) => {
  try {
    const { data } = await api.lowest_watched_series_graph(formData);

    dispatch({ type: LOWEST_WATCHED_SERIES, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const highest_watched_song_graph = (formData) => async (dispatch) => {
  try {
    const { data } = await api.highest_watched_song_graph(formData);

    dispatch({ type: HIGHEST_WATCHED_SONG_GRAPH, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const lowest_watched_song = (formData) => async (dispatch) => {
  try {
    const { data } = await api.lowest_watched_song(formData);

    dispatch({ type: LOWEST_WATCHED_SONG, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const highest_searched_movies_graph = (formData) => async (dispatch) => {
  try {
    const { data } = await api.highest_searched_movies_graph(formData);

    dispatch({ type: HIGHEST_SEARCHED_MOVIES_GRAPH, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const currently_logged_in_users = (formData) => async (dispatch) => {
  try {
    const { data } = await api.currently_logged_in_users(formData);

    dispatch({ type: CURRENTLY_LOGGED_IN_USERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const currently_watching_users = (formData) => async (dispatch) => {
  try {
    const { data } = await api.currently_watching_users(formData);

    dispatch({ type: CURRENTLY_WATCHING_USERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const device_used_for_watching = (formData) => async (dispatch) => {
  try {
    const { data } = await api.device_used_for_watching(formData);

    dispatch({ type: DEVICE_USED_FOR_WATCHING, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const area_wise_ad_view = (formData) => async (dispatch) => {
  try {
    const { data } = await api.area_wise_ad_view(formData);

    dispatch({ type: AREA_WISE_AD_VIEW, payload: data });
  } catch (error) {
    console.log(error);
  }
};
