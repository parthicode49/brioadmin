
import { MESSAGE,COMPLAINTS } from '../constants/actionTypes'
import * as api from '../api/index.js';




  export const all_complaint_list = (formData) => async (dispatch) => {
    try {
      const { data } = await api.all_complaint_list(formData);
      dispatch({ type: COMPLAINTS, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const complaint_status_update = (formData) => async (dispatch) => {
    try {
      const { data } = await api.complaint_status_update(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  