import { useState } from "react";
import axios from "axios";

const apiBase = import.meta.env.VITE_API_URL;

const useApi = () => {
  const [loading, setLoading] = useState(false);

  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return {
    loading,
    postRequest: async (path, data) => {
      setLoading(true);
      return axios
        .post(`${apiBase}/${path}`, data, {
          headers: defaultHeaders,
          withCredentials: true,
        })
        .then((res) => {
          setLoading(false);
          return res;
        })
        .catch((err) => {
          setLoading(false);
          throw err;
        });
    },
    putRequest: async (path, data) => {
      setLoading(true);
      return axios
        .put(`${apiBase}/${path}`, data, {
          headers: defaultHeaders,
          withCredentials: true,
        })
        .then((res) => {
          setLoading(false);
          return res;
        })
        .catch((err) => {
          setLoading(false);
          throw err;
        });
    },
    getRequest: async (path) => {
      setLoading(true);
      return axios
        .get(`${apiBase}/${path}`, {
          headers: defaultHeaders,
          withCredentials: true,
        })
        .then((res) => {
          setLoading(false);
          return res;
        })
        .catch((err) => {
          setLoading(false);
          throw err;
        });
    },
    deleteRequest: async (path) => {
      setLoading(true);
      return axios
        .delete(`${apiBase}/${path}`, {
          headers: defaultHeaders,
          withCredentials: true,
        })
        .then((res) => {
          setLoading(false);
          return res;
        })
        .catch((err) => {
          setLoading(false);
          throw err;
        });
    },
  };
};
