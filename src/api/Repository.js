import Axios from "axios";

const baseURL = "http://127.0.0.1:8081/";

const repository = Axios.create({
  baseURL
});

export default repository;
