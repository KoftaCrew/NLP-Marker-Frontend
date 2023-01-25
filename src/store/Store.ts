import { configureStore } from "@reduxjs/toolkit";

import historyReducer from "./HistorySlice";
import openFileReducer from "./OpenFileSlice";

export const store = configureStore({
  reducer: {
    history: historyReducer,
    openFile: openFileReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
