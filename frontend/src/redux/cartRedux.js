import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../axiosRequest";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      state.quantity -= 1;
      state.products.splice(action.payload.index, 1);
      state.total -=
        action.payload.product.price * action.payload.product.quantity;
    },
    updateQuantity: (state, action) => {
      state.products.forEach(async (p) => {
        if (p._id === action.payload.pId) {
          const diff = (action.payload.quantity - p.quantity) * p.price;
          p.quantity = action.payload.quantity;
          state.total += diff;
          await userRequest.post(`/cart/${action.payload.userId}`, {
            total: state.total,
          });
        }
      });
    },
    clearCart: (state) => {
      state.products = [];
      state.total = 0;
      state.quantity = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.products = action.payload.Product;
      state.quantity = action.payload.quantity;
      state.total = action.payload.total;
    });
  },
});

export const getCart = createAsyncThunk("user/cart", async (_, thunkAPI) => {
  try {
    const user = thunkAPI.getState().user.currentUser.user;
    const res = await userRequest.get(`/cart/find/${user._id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const { addProduct, removeProduct, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
