import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCartItems, addCartItem, deleteCartItem } from '../apis/cartapi'; // Import your API functions

// Async thunks

export const fetchCartItemsThunk = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCartItems(); // Use existing API function
      return data; // Return cart items
    } catch (error) {
      return rejectWithValue(error.message); // Handle errors
    }
  }
);

export const addCartItemThunk = createAsyncThunk(
  'cart/addCartItem',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const data = await addCartItem(productId, quantity); // Use existing API function
      return data; // Return added item response
    } catch (error) {
      return rejectWithValue(error.message); // Handle errors
    }
  }
);

export const deleteCartItemThunk = createAsyncThunk(
  'cart/deleteCartItem',
  async (itemId, { rejectWithValue }) => {
    try {
      await deleteCartItem(itemId); // Use existing API function
      return itemId; // Return the deleted item ID
    } catch (error) {
      return rejectWithValue(error.message); // Handle errors
    }
  }
);

const initialState = {
  items: [], // Array to store cart items
  status: 'idle', // Status to track loading state
  error: null, // Error message storage
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = []; // Clear all cart items
    },
  },
  extraReducers: (builder) => {
    // Handle fetch cart items thunk
    builder
      .addCase(fetchCartItemsThunk.pending, (state) => {
        state.status = 'loading'; // Set status to loading
      })
      .addCase(fetchCartItemsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set status to succeeded
        state.items = action.payload; // Set cart items to fetched data
      })
      .addCase(fetchCartItemsThunk.rejected, (state, action) => {
        state.status = 'failed'; // Set status to failed
        state.error = action.payload; // Store error message
      });

    // Handle add cart item thunk
    builder
      .addCase(addCartItemThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCartItemThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload); // Push new item to cart
      })
      .addCase(addCartItemThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Handle delete cart item thunk
    builder
      .addCase(deleteCartItemThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartItemThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((item) => item.id !== action.payload); // Remove item from cart
      })
      .addCase(deleteCartItemThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export clearCart action
export const { clearCart } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
