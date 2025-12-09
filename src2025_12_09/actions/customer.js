
import { MESSAGE,CUSTOMERS,CUSTOMER ,PREMIUMCUSBYRENT ,CUSTOMERLOADINGSEARCH,PREMIUMCUSBYPLAN, CUSTOMERLOADING} from './../constants/actionTypes';
import * as api from './../api/index.js';




  export const customer_update = (formData) => async (dispatch) => {
    try {
      const { data } = await api.customer_update(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const customer_delete = (formData) => async (dispatch) => {
    try {
      const { data } = await api.customer_delete(formData);
      dispatch({ type: MESSAGE, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const all_customer_list = (formData) => async (dispatch) => {
    try {
      const { data } = await api.all_customer_list(formData);
      
      dispatch({ type: CUSTOMERS, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  
  export const customer_details = (formData) => async (dispatch) => {
    try {
      const { data } = await api.customer_details(formData);
      
      dispatch({ type: CUSTOMER, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const highest_plan_buy_count = (formData) => async (dispatch) => {
    try {
      const { data } = await api.highest_plan_buy_count(formData);
      
      dispatch({ type: PREMIUMCUSBYPLAN, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const highest_rented_movie_count = (formData) => async (dispatch) => {
    try {
      const { data } = await api.highest_rented_movie_count(formData);
      
      dispatch({ type: PREMIUMCUSBYRENT, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const all_customer_list_admin_loadless = (formData) => async (dispatch) => {
    try {
      const { data } = await api.all_customer_list_admin_loadless(formData);
      
      dispatch({ type: CUSTOMERLOADING, payload:data });
      return data
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const search_customer_admin = (formData) => async (dispatch) => {
    try {
      const { data } = await api.search_customer_admin(formData);
      
      dispatch({ type: CUSTOMERLOADINGSEARCH, payload:data });
      return data
  
   
    } catch (error) {
      console.log(error);
    }
  };

  
  