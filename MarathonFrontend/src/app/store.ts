import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import marathonReducer from "./slices/marathonSlice";
import registrationReducer from "./slices/registrationSlice";
import paymentReducer from "./slices/paymentSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    marathons: marathonReducer,
    registrations: registrationReducer,
    payments: paymentReducer,
    users: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;