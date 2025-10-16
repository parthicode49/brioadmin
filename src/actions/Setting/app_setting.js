
import { MESSAGE,APPSETTING } from '../../constants/actionTypes'
import * as api from '../../api/index.js';




  export const app_setting = (formData) => async (dispatch) => {
    try {
      const { data } = await api.app_setting(formData);
      
      dispatch({ type: APPSETTING, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const app_setting_update = (formData) => async (dispatch) => {
    try {
      const { data } = await api.app_setting_update(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  