import { AUTH_ERRORS } from "./constants";

export const getError = (error) => AUTH_ERRORS[error] || AUTH_ERRORS.Unknown;
