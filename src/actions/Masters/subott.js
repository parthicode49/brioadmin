
import { MESSAGE,SUBOTT } from '../../constants/actionTypes';
import * as api from '../../api/index.js';

export const sub_ott_create = (formData) => async (dispatch) => {
    try {
      const { data } = await api.sub_ott_create(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
export const sub_ott_update = (formData) => async (dispatch) => {
    try {
      const { data } = await api.sub_ott_update(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
export const sub_ott_delete = (formData) => async (dispatch) => {
    try {
      const { data } = await api.sub_ott_delete(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
export const all_sub_ott_list = (formData) => async (dispatch) => {
    try {
      const { data } = await api.all_sub_ott_list(formData);
      dispatch({ type: SUBOTT, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
