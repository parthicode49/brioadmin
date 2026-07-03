import { MESSAGE, SEASONS, SEASONS_NAME } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const season_create = (formData) => async (dispatch) => {
  try {
    const  data  = await api.season_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
   return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const season_update = (formData) => async (dispatch) => {
  try {
    const data  = await api.season_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
 return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};

export const season_status_update = (formData) => async (dispatch) => {
  try {
    const { data } = await api.season_status_update(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const season_delete = (formData) => async (dispatch) => {
  try {
    const { data } = await api.season_delete(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const all_season_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.all_season_list(formData);

    dispatch({ type: SEASONS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const only_season_id_name = (formData) => async (dispatch) => {
  try {
    const { data } = await api.only_season_id_name(formData);

    dispatch({ type: SEASONS_NAME, payload: data });
  } catch (error) {
    console.log(error);
  }
};
