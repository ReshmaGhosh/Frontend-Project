import axios, { AxiosError } from "axios";

interface ErrorData {
  message?: string;
}

export const axiosErrorHandler = (error: AxiosError): ErrorData | undefined => {
  if (
    error.response?.data &&
    typeof error.response.data === "object" &&
    "message" in error.response.data
  ) {
    const message = error.response.data.message;
    if (typeof message === "string") {
      return { message: message };
    }
  }

  const errorCode = error.code;
  if (
    errorCode &&
    typeof errorCode === "string" &&
    ["ERR_BAD_REQUEST", "ERR_NETWORK", "ERR_BAD_RESPONSE"].includes(errorCode)
  ) {
    return { message: error.message };
  }

  return undefined;
};
