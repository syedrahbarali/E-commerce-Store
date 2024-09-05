import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts: (state, actions) => {
      state.products = actions.payload.products;
      return state;
    },
  },
});

export default productsSlice.reducer;
export const { setProducts } = productsSlice.actions;
