import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Function to create a new Axios instance
const createAxiosInstance = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
};

// Hook to manage API requests with a separate loader
const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const API = createAxiosInstance(); // Create a separate Axios instance

  API.interceptors.request.use(
    (config) => {
      setLoading(true);
      const token = localStorage.getItem("@Token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }else {
        console.warn("No JWT token found in localStorage!");
      }
      return config;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  API.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        console.log(error);
        console.error("Unauthorized request - Invalid or missing token!");
        localStorage.removeItem("jwtToken"); // Clear expired token
        router.push("/login"); // Redirect to login page
      }
      return Promise.reject(error);
    }
  );

  return { API, loading };
};

export default useAxios;
