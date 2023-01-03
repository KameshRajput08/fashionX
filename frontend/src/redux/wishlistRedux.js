import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../axiosRequest";

const wishlistSlice = createSlice({
  name: "Wishlist",
  initialState: {
    products: [],
  },
  reducers: {
    addPro: (state, action) => {
      state.products.push(action.payload);
    },
    removePro: (state, action) => {
      const index = state.products.findIndex((item) => {
        return item._id === action.payload;
      });
      state.products.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.products = action.payload.Product;
      })
      .addCase(getWishlist.rejected, (state) => {
        state.products = [];
      });
  },
});

export const getWishlist = createAsyncThunk(
  "user/wishlist",
  async (_, thunkAPI) => {
    try {
      const user = thunkAPI.getState().user.currentUser.user;
      const res = await userRequest.get(`/wishlist/find/${user._id}`);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const { addPro, removePro } = wishlistSlice.actions;
export default wishlistSlice.reducer;
