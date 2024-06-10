// eslint-disable-next-line import/prefer-default-export
export const prepareHeaders = (headers, { getState }) => {
  const { auth } = getState();
  headers.set('Authorization', `Bearer ${auth?.token}`);

  return headers;
};
