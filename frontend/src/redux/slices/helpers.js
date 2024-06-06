import { UI_ERRORS, AUTH_ERRORS } from './constants';

export const extractAuthError = (error) => AUTH_ERRORS[error] || '';

export const extractUiError = (error) => (
  !extractAuthError(error) && (UI_ERRORS[error] || UI_ERRORS.Unknown)
);

export const clearError = (state) => {
  Object.assign(state, {
    error: '',
    isError: false,
  });
};
