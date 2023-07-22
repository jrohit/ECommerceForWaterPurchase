import axios from "axios";

console.log(process.env.NODE_ENV);
const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000", // Replace with your backend API URL
  timeout: 5000, // Set a timeout value (in milliseconds) for requests
  headers: {
    "Content-Type": "application/json", // Set the default content type for requests
  },
});

export default axiosInstance;
