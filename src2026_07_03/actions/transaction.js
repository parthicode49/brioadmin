
import { TRANSACTIONS, TRANSACTIONSLOADING } from './../constants/actionTypes';
import * as api from './../api/index.js';



  export const all_transaction_list = (formData) => async (dispatch) => {
    try {
      const { data } = await api.all_transaction_list(formData);
      
      dispatch({ type: TRANSACTIONS, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const all_successfull_transaction_admin_loadless = (formData) => async (dispatch) => {
    try {
      const { data } = await api.all_successfull_transaction_admin_loadless(formData);
      
      dispatch({ type: TRANSACTIONSLOADING, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  