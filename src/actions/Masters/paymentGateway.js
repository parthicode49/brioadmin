
import { MESSAGE, PAYMENTGATEWAY } from '../../constants/actionTypes';
import * as api from '../../api/index.js';


  export const payment_provider_update = (formData) => async (dispatch) => {
    try {
      const { data } = await api.payment_provider_update(formData);
      
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const all_payment_provider_list = (formData) => async (dispatch) => {
    try {
      const { data } = await api.all_payment_provider_list(formData);
      
      dispatch({ type: PAYMENTGATEWAY, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  