import { DIS_DASHBOARD_COUNT, DIS_MOST_WATCH_MOVIE, DIS_MOST_WATCH_SERIES, DIS_MOST_WATCH_SONG, DIS_REVENUE_WATCH_MOVIE, DIS_REVENUE_WATCH_SERIES, DIS_REVENUE_WATCH_SONG } from "../constants/actionTypes.js";
import * as api from "./../api/index.js";

export const distrubutor_most_watched_movie = (formData) => async (dispatch) => {
  try {
    const { data } = await api.distrubutor_most_watched_movie(formData);

    dispatch({ type: DIS_MOST_WATCH_MOVIE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const distributor_most_watched_series = (formData) => async (dispatch) => {
  try {
    const { data } = await api.distributor_most_watched_series(formData);

    dispatch({ type: DIS_MOST_WATCH_SERIES, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const distributor_most_watched_song = (formData) => async (dispatch) => {
  try {
    const { data } = await api.distributor_most_watched_song(formData);

    dispatch({ type: DIS_MOST_WATCH_SONG, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const distributor_movie_yearly_revenue = (formData) => async (dispatch) => {
  try {
    const { data } = await api.distributor_movie_yearly_revenue(formData);

    dispatch({ type: DIS_REVENUE_WATCH_MOVIE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const distributor_series_yearly_revenue = (formData) => async (dispatch) => {
  try {
    const { data } = await api.distributor_series_yearly_revenue(formData);

    dispatch({ type: DIS_REVENUE_WATCH_SERIES, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const distributor_song_yearly_revenue = (formData) => async (dispatch) => {
  try {
    const { data } = await api.distributor_song_yearly_revenue(formData);

    dispatch({ type: DIS_REVENUE_WATCH_SONG, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const distributor_dashboard_count = (formData) => async (dispatch) => {
  try {
    const { data } = await api.distributor_dashboard_count(formData);

    dispatch({ type: DIS_DASHBOARD_COUNT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
