import axios from "axios";
import { HOST, PORT } from "../../../config";

axios.defaults.baseURL = `${HOST}:${PORT}`;

export default axios;
