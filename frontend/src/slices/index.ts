import { configureStore } from "@reduxjs/toolkit";
import channelsSlice from "./channels";

export default configureStore({
  reducer: {
    channelsSlice,
  },
});
