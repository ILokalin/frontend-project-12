import axios, { AxiosResponse, AxiosError } from "axios";

export const request = (url: string, method: string, data?: any) => {
  const config = {
    method,
    url,
    data,
  };

  return axios(config)
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
