import * as actionType from "../constants/actionTypes";

const customersReducer = (state = { customersData: null }, action) => {
  switch (action.type) {
    case actionType.CUSTOMERS:
      return { ...state, customers: action.payload };
    case actionType.CUSTOMER:
      return { ...state, customer: action.payload };
    case actionType.PREMIUMCUSBYPLAN:
      return { ...state, premium_by_plan: action.payload };
    case actionType.PREMIUMCUSBYRENT:
      return { ...state, premium_by_rent: action.payload };
    case actionType.CUSTOMERLOADING:
      return { ...state, customerLoading: action.payload };

    default:
      return state;
  }
};

export default customersReducer;
