import axios, { AxiosResponse, AxiosError } from "axios";

export const request = (url: string, config: any = {}) => {
  const axiosConfig = {
    method: "GET",
    url,
    ...(config && { ...config }),
  };

  return axios(axiosConfig)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      return {
        isError: true,
        code: error.response?.status || 500,
        message: error.message || "An unknown error occurred",
      };
    });
};
