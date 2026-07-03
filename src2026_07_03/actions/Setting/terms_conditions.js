
import { MESSAGE,TERMSCONDITIONS } from '../../constants/actionTypes'
import * as api from '../../api/index.js';




  export const terms_and_conditions = (formData) => async (dispatch) => {
    try {
      const { data } = await api.terms_and_conditions(formData);
      dispatch({ type: TERMSCONDITIONS, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const terms_and_conditions_update = (formData) => async (dispatch) => {
    try {
      const { data } = await api.terms_and_conditions_update(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  