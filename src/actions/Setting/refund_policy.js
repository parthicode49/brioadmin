
import { MESSAGE,REFUNDPOLICY } from '../../constants/actionTypes'
import * as api from '../../api/index.js';




  export const refund_policy = (formData) => async (dispatch) => {
    try {
      const { data } = await api.refund_policy(formData);
      dispatch({ type: REFUNDPOLICY, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const refund_policy_update = (formData) => async (dispatch) => {
    try {
      const { data } = await api.refund_policy_update(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  