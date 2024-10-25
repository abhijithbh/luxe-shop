import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../requestMethods";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue, getState }) => {
    const { cart } = getState();
    if (cart.products.length > 0) {
      return cart;
    }
    try {
      const response = await userRequest.get(`/carts/find/${userId}`);
      return response.data;
    } catch (err) {
      console.error("Error fetching cart:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ userId, products }, { rejectWithValue }) => {
    try {
      const response = await userRequest.post(`/carts`, { userId, products });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// export const clearServerCart = createAsyncThunk(
//   "cart/clearServerCart",
//   async (userId, { rejectWithValue }) => {
//     try {
//       await userRequest.delete(`/cart/${userId}`);
//       return { success: true };
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    isFetching: false,
    error: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload
      );
      if (index !== -1) {
        state.quantity -= 1;
        state.total -=
          state.products[index].price * state.products[index].quantity;
        state.products.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isFetching = false;
        if (action.payload.products) {
          state.products = action.payload.products;
          state.quantity = state.products.length;
          state.total = state.products.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
          );
        }
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      });
  },
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
