import { combineReducers } from "@reduxjs/toolkit";
// Import your individual slice reducers here
import waterReducer from "../components/water/waterSlice";
import orderReducer from "../components/order/orderSlice";
import loginReducer from "../components/login/loginSlice";

const rootReducer = combineReducers({
  // Add your individual slice reducers here
  water: waterReducer,
  order: orderReducer,
  login: loginReducer,
});

export default rootReducer;
