
import { MESSAGE,UPCOMING_MOVIES } from '../../constants/actionTypes';
import * as api from '../../api/index.js';


export const upcoming_movie_create = (formData) => async (dispatch) => {
    try {
      const { data } = await api.upcoming_movie_create(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };

  export const upcoming_movie_update = (formData) => async (dispatch) => {
    try {
      const { data } = await api.upcoming_movie_update(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const upcoming_movie_delete = (formData) => async (dispatch) => {
    try {
      const { data } = await api.upcoming_movie_delete(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const all_upcoming_movie_list = (formData) => async (dispatch) => {
    try {
      const { data } = await api.all_upcoming_movie_list(formData);
      
      dispatch({ type: UPCOMING_MOVIES, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  