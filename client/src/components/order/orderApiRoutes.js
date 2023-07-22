import axiosInstance from "../../lib/axiosinstance";
import {
  DELETE_ORDER,
  FETCH_ALL_ORDERS,
  SUBMIT_ORDER,
  UPDATE_ORDER,
  UPDATE_WATER_CURRENT_CAPCITY_AFTER_ORDER,
} from "../utils/URL";

const submitOrder = (payload) => {
  return axiosInstance.post(SUBMIT_ORDER, { ...payload });
};

export const fetchAllOrders = () => {
  return axiosInstance.get(FETCH_ALL_ORDERS);
};

export const updateOrder = (payload) => {
  return axiosInstance.post(UPDATE_ORDER, { ...payload });
};

export const deleteOrder = (payload) => {
  return axiosInstance.post(DELETE_ORDER, { ...payload });
};

export const updateCapacityOnOrderSubmission = ({ waterQuantityToReduce }) => {
  return axiosInstance.post(UPDATE_WATER_CURRENT_CAPCITY_AFTER_ORDER, {
    waterQuantityToReduce,
  });
};

export default submitOrder;
