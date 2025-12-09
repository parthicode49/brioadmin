
import { MESSAGE,GENRE } from '../../constants/actionTypes';
import * as api from '../../api/index.js';

export const genre_create = (formData) => async (dispatch) => {
    try {
      const { data } = await api.genre_create(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };

  export const genre_update = (formData) => async (dispatch) => {
    try {
      const { data } = await api.genre_update(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const genre_delete = (formData) => async (dispatch) => {
    try {
      const { data } = await api.genre_delete(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const all_genre_list = (formData) => async (dispatch) => {
    try {
      const { data } = await api.all_genre_list(formData);
      
      dispatch({ type: GENRE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  