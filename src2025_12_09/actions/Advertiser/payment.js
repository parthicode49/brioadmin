import { MESSAGE, PAYMENT } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const get_payment_metadata = (formData) => async (dispatch) => {
  try {
    const data = await api.get_payment_metadata(formData);
    dispatch({ type: PAYMENT, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
export const transaction_create = (formData) => async (dispatch) => {
  try {
    const data = await api.transaction_create(formData);
    dispatch({ type: PAYMENT, payload: data?.data });
    return data;
  } catch (error) {
    dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
  }
};
