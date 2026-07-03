
import { ADDELETE, MESSAGE , SETAD } from '../constants/actionTypes';
import * as api from '../api/index.js';


export const set_advertise = (formData) => async (dispatch) => {
    try {
      const { data } = await api.set_advertise(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };

  export const set_update_advertise = (formData) => async (dispatch) => {
    try {
      const { data } = await api.set_update_advertise(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const set_advertise_delete = (formData) => async (dispatch) => {
    try {
      const { data } = await api.set_advertise_delete(formData);
      dispatch({ type: ADDELETE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };

  export const set_advertise_list = (formData) => async (dispatch) => {
    try {
      const { data } = await api.set_advertise_list(formData);
      dispatch({ type: SETAD, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };