import { MESSAGE, SONGCATEGORIES } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const song_category_create = (formData) => async (dispatch) => {
  try {
    const data = await api.song_category_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const song_category_update = (formData) => async (dispatch) => {
  try {
    const data = await api.song_category_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const all_song_category_list_admin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_song_category_list_admin(formData);
    dispatch({ type: SONGCATEGORIES, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};
export const song_category_status_update = (formData) => async (dispatch) => {
  try {
    const { data } = await api.song_category_status_update(formData);
    dispatch({ type: MESSAGE, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};
export const song_category_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.song_category_delete(formData);
    dispatch({ type: MESSAGE, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};
