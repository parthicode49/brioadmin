
import { MESSAGE,ABOUTUS } from '../../constants/actionTypes'
import * as api from '../../api/index.js';




  export const about_us = (formData) => async (dispatch) => {
    try {
      const { data } = await api.about_us(formData);
      
      dispatch({ type: ABOUTUS, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const about_us_update = (formData) => async (dispatch) => {
    try {
      const { data } = await api.about_us_update(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  