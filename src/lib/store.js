import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import { api } from "./api";
import { setupListeners } from "@reduxjs/toolkit/query";
import searchReducer from "./features/searchSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    search: searchReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch)