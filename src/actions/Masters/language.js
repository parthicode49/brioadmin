
import { MESSAGE,LANGUAGES } from '../../constants/actionTypes';
import * as api from '../../api/index.js';

export const language_create = (formData) => async (dispatch) => {
    try {
      const data  = await api.language_create(formData);
      dispatch({ type: MESSAGE, payload: data?.data });
      return data;
   
    } catch (error) {
     dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
    }
  };

  export const language_update = (formData) => async (dispatch) => {
    try {
      const  data  = await api.language_update(formData);
     dispatch({ type: MESSAGE, payload: data?.data });
      return data;
   
    } catch (error) {
     dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
    }
  };
  export const language_delete = (formData) => async (dispatch) => {
    try {
      const { data } = await api.language_delete(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
    }
  };
  export const language_status_update = (formData) => async (dispatch) => {
    try {
      const { data } = await api.language_status_update(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      dispatch({ type: MESSAGE, payload: error?.response?.data });
    return error?.response?.data;
    }
  };
  export const all_language_list = (formData) => async (dispatch) => {
    try {
      const { data } = await api.all_language_list(formData);
      
      dispatch({ type: LANGUAGES, payload:data });
  
   
    } catch (error) {
       dispatch({ type: MESSAGE, payload: error?.response?.data });
       return error?.response?.data;
    }
  };
  