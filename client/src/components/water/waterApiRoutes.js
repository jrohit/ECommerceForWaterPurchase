import axiosInstance from "../../lib/axiosinstance";
import {
  GET_WATER_TOTAL_CAPACITY,
  UPDATE_WATER_CAPACITY_URL,
} from "../utils/URL";

const updateWaterStorageCapacity = ({ waterQuantity }) => {
  return axiosInstance.post(UPDATE_WATER_CAPACITY_URL, {
    quantity: waterQuantity,
  });
};

export const getWaterTotalCapacity = () => {
  return axiosInstance.post(GET_WATER_TOTAL_CAPACITY);
};

export default updateWaterStorageCapacity;
