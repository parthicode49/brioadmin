
import { MESSAGE,PRIVACYPOLICY } from '../../constants/actionTypes'
import * as api from '../../api/index.js';




  export const privacy_policy = (formData) => async (dispatch) => {
    try {
      const { data } = await api.privacy_policy(formData);
      dispatch({ type: PRIVACYPOLICY, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const privacy_policy_update = (formData) => async (dispatch) => {
    try {
      const { data } = await api.privacy_policy_update(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  