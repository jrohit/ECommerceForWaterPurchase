import axiosInstance from "../../lib/axiosinstance";
import { LOGIN_URL } from "../utils/URL";

const authenticateUser = (payload) => {
  return axiosInstance.post(LOGIN_URL, { ...payload });
};

export default authenticateUser;
