import { MESSAGE, CONTENT_LEAVING_SOON } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const content_leaving_soon = (formData) => async (dispatch) => {
  try {
    const { data } = await api.content_leaving_soon(formData);
    dispatch({ type: CONTENT_LEAVING_SOON, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const content_expire_date_update = (formData) => async (dispatch) => {
  try {
    const data = await api.content_expire_date_update(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
