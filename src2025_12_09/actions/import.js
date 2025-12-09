import { MESSAGE } from './../constants/actionTypes';
import * as api from './../api/index.js';



  export const bulk_import = (formData) => async (dispatch) => {
    try {
      const { data } = await api.bulk_import(formData);
      
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  