import axios from "axios";
import api from "./const";

const $api = axios.create({
    withCredentials: true,
    baseURL: api.server + '/'
})