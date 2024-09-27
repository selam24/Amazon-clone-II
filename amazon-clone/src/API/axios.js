import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://amazon-api-2.onrender.com",
});

export { axiosInstance };
