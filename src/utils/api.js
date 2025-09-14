import axios from "axios";

const API = "http://localhost:8585";

export const getSeries = async () => {
  const res = await axios.get(`${API}/series`);
  return res.data;
};
