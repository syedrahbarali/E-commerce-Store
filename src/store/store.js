import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import productsSlice from "./slices/productsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
  },
});

export default store;
