import axios from "axios";
import { HOST, PORT } from "../../../config";

axios.defaults.baseURL = `${HOST}:${PORT}`;
// 响应拦截
axios.interceptors.response.use(
    response => {
      return response.data || {err:"no data"};
    },
    error => {
      return Promise.reject(error);
    }
  );
export default axios;
