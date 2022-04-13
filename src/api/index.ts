import axios from "axios";

import { BASE_URL } from "./const";

const instanse = axios.create({
  baseURL: BASE_URL
})

export default instanse