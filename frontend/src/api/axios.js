import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true, // If you're handling cookies/sessions
});

export default instance;
