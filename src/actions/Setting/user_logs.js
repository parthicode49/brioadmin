
import { LOGS, LOGSDEC } from '../../constants/actionTypes'
import * as api from '../../api/index.js';




  export const user_log_list = (formData) => async (dispatch) => {
    try {
      const { data } = await api.user_log_list(formData);
      
      dispatch({ type: LOGS, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const user_log_detai = (formData) => async (dispatch) => {
    try {
      const { data } = await api.user_log_detail(formData);
      
      dispatch({ type:LOGSDEC, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  }
  
  