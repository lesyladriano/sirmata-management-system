import axios from "axios";
import { useStateContext } from "./context/admin/ContextProvider";

const axiosClient = axios.create({
 baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axios.defaults.withCredentials = false;

axiosClient.defaults.headers.common = {
 "X-Requested-With": "XMLHttpRequest",
 // Add other headers if needed
};

axiosClient.interceptors.request.use((config) => {
 const token = localStorage.getItem("ACCESS_TOKEN");
 const expirationTime = new Date(localStorage.getItem("TOKEN_EXPIRE"));

 if (expirationTime <= new Date()) {
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.clear();
 } else {
  config.headers.Authorization = `Bearer ${token}`;
 }

 return config;
});

axiosClient.interceptors.response.use(
 (response) => {
  // Check if the response contains an access token
  if (response.data && response.data.token) {
   const accessToken = response.data.token;
   const token = document.head.querySelector('meta[name="csrf-token"]');

   if (token) {
    // Set X-CSRF-TOKEN header
    response.config.headers["X-CSRF-TOKEN"] = token.content;
   }

   // Store the access token and expiration time in local storage
   localStorage.setItem("ACCESS_TOKEN", accessToken);

   // Set the access token in the request headers for future requests
   response.config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return response;
 },
 (error) => {
  const { response } = error;
  if (response) {
   if (response.status === 401) {
    window.location.reload();
   } else {
    console.error("Error Response:", response);
   }
  } else {
   if (!localStorage.getItem("ACCESS_TOKEN")) {
    window.location.reload();
   } else {
    console.error("Network Error:", error.message);
   }
  }
  // Re-throw the error to maintain the error chain
  throw error;
 }
);

export default axiosClient;
