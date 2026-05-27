import axios from "axios";

const BACKEND_URL =
  window.location.port === "3000"
    ? "http://localhost:8000"
    : window.location.origin;

export const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createSekolah = async (payload) => {
  const res = await api.post("/sekolah", payload);
  return res.data;
};

export const listSekolah = async () => {
  const res = await api.get("/sekolah");
  return res.data;
};

export const resetSekolah = async () => {
  const res = await api.delete("/sekolah");
  return res.data;
};