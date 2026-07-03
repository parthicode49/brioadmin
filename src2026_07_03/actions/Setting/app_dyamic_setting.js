import { MESSAGE,  APP_DYANMIC } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const admin_app_dynamic_setting = (formData) => async (dispatch) => {
  try {
    const { data } = await api.admin_app_dynamic_setting(formData);

    dispatch({ type: APP_DYANMIC, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const app_dyanmic_setting_update = (formData) => async (dispatch) => {
  try {
    const { data } = await api.app_dyanmic_setting_update(formData);
    dispatch({ type: MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
