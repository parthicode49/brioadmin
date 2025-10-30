import { ADINMOVIE, ADNAME, MESSAGE } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const advertisement_in_movie_create = (formData) => async (dispatch) => {
  try {
    const data = await api.advertisement_in_movie_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });

    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const advertisement_in_movie_update = (formData) => async (dispatch) => {
  try {
    const data = await api.advertisement_in_movie_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });

    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const advertisement_in_movie_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.advertisement_in_movie_delete(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const advertisement_in_movie_list_admin =
  (formData) => async (dispatch) => {
    try {
      const data = await api.advertisement_in_movie_list_admin(formData);
      dispatch({ type: ADINMOVIE, payload: data?.data });

      return data;
    } catch (error) {
      dispatch({ type: MESSAGE, payload: error?.response?.data });
      return error?.response?.data;
    }
  };

export const advertisement_name_id_only = (formData) => async (dispatch) => {
  try {
    const data = await api.advertisement_name_id_only(formData);
    dispatch({ type: ADNAME, payload: data?.data });

    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
