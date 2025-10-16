
import { MESSAGE,AVATARS } from '../../constants/actionTypes';
import * as api from '../../api/index.js';

export const avatar_create = (formData) => async (dispatch) => {
    try {
      const { data } = await api.avatar_create(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };

  export const avatar_update = (formData) => async (dispatch) => {
    try {
      const { data } = await api.avatar_update(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const avatar_delete = (formData) => async (dispatch) => {
    try {
      const { data } = await api.avatar_delete(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const all_avatar_list = (formData) => async (dispatch) => {
    try {
      const { data } = await api.all_avatar_list(formData);
      
      dispatch({ type: AVATARS, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  