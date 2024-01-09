import axios from "axios";

export const request = (url, config = {}) => {
  const axiosConfig = {
    method: "GET",
    url,
    ...(config && { ...config }),
  };

  return axios(axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return {
        isError: true,
        code: error.response?.status || 500,
        message: error.message || "An unknown error occurred",
      };
    });
};
