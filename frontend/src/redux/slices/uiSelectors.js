import { createSelector } from '@reduxjs/toolkit';

const selectUi = (state) => state.ui;

export const selectCurrentChannelId = createSelector(
  selectUi,
  (state) => state?.currentId,
);

export const selectDefaultChannelId = createSelector(
  selectUi,
  (state) => state?.defaultId,
);

export const selectIsUiError = createSelector(
  selectUi,
  (state) => state.isError,
);

export const selectUiError = createSelector(selectUi, (state) => state.error);
