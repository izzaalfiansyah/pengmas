import axios from "axios";

export default function () {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      throw err.response.data;
    }
  );

  return instance;
}
