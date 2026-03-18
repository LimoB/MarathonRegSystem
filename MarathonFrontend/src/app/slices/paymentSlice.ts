import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCheckoutSession,
  getPayments,
  type Payment,
} from "../../api/payments";

// STATE
interface PaymentState {
  payments: Payment[];
  checkoutUrl: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  payments: [],
  checkoutUrl: null,
  loading: false,
  error: null,
};

//////////////////////////////////////////////////////
// 🔄 THUNKS
//////////////////////////////////////////////////////

// CREATE CHECKOUT
export const initiatePayment = createAsyncThunk(
  "payments/checkout",
  async (data: any, thunkAPI) => {
    try {
      const res = await createCheckoutSession(data);
      return res.url;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Payment failed"
      );
    }
  }
);

// GET ALL PAYMENTS (ADMIN)
export const fetchPayments = createAsyncThunk(
  "payments/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await getPayments();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch payments"
      );
    }
  }
);

//////////////////////////////////////////////////////
// 🧠 SLICE
//////////////////////////////////////////////////////

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    clearCheckout: (state) => {
      state.checkoutUrl = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // CHECKOUT
      .addCase(initiatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutUrl = action.payload;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH PAYMENTS
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCheckout } = paymentSlice.actions;
export default paymentSlice.reducer;