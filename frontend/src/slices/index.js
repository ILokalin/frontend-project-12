import { configureStore } from "@reduxjs/toolkit";
import channelsSlice from "./channels";
import messagesSlice from "./messages";

export default configureStore({
  reducer: {
    channelsSlice,
    messagesSlice,
  },
});
