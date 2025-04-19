import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://supermarket.byethost7.com",
  timeout: 1000,
  //   headers: { "X-Custom-Header": "foobar" },
});

export default axiosInstance;
