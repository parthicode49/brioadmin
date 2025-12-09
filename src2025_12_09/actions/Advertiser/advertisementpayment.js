
import { MESSAGE ,ADPAYMENTLIST } from '../../constants/actionTypes';
import * as api from '../../api/index.js';


export const advertise_transaction_create = (formData) => async (dispatch) => {
    try {
      const { data } = await api.advertise_transaction_create(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const advertiser_transaction_history = (formData) => async (dispatch) => {
    try {
      const { data } = await api.advertiser_transaction_history(formData);
      dispatch({ type: ADPAYMENTLIST, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  }

  