import { MESSAGE, USER_SUB } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const user_subscription_by_admin = (formData) => async (dispatch) => {
  try {
    const data = await api.user_subscription_by_admin(formData);
    dispatch({ type: USER_SUB, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const transaction_create = (formData) => async (dispatch) => {
  try {
    const data = await api.transaction_create(formData);
    dispatch({ type: MESSAGE, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
