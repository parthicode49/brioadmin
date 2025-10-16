
import * as api from '../api/index.js';
import {MESSAGE, ADVERTISEMENT } from '../constants/actionTypes.js';


  // export const advertise_form_create = (formData) => async (dispatch) => {
  //   try {
  //     const { data } = await api.advertise_form_create(formData);
      
  //     dispatch({ type: MESSAGE, payload:data });
  
   
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  export const all_advertisement_list = (formData) => async (dispatch) => {
    try {
      const { data } = await api.all_advertisement_list(formData);
      
      dispatch({ type: ADVERTISEMENT, payload:data });
  
   
    } catch (error) {
      console.log(error);
    }
  };
  export const advertisement_update = (formData) => async (dispatch) => {
    try{
        const {data} = await api.advertisement_update(formData);
        dispatch({type:MESSAGE , payload:data})
    } catch(error){
        console.log(error)
    }
  }
  // export const advertise_form_delete = (formData) => async (dispatch) => {
  //   try{
  //       const {data} = await api.advertise_form_delete(formData);
  //       dispatch({type:MESSAGE , payload:data})
  //   } catch(error){
  //       console.log(error)
  //   }
  // }
  
  
  
  