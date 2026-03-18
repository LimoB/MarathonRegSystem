import api from "./axios";

// TYPES
export interface CreateCheckoutPayload {
  registration_id: number;
  amount: number;
  marathon_name: string;
}

export interface Payment {
  id: number;
  registration_id: number;
  amount: number;
  method: string;
  status: "pending" | "completed" | "failed";
  stripe_payment_id: string;
  paid_at?: string;
}

// CREATE CHECKOUT SESSION (Athlete)
export const createCheckoutSession = async (
  data: CreateCheckoutPayload
) => {
  const res = await api.post("/payments/create-checkout-session", data);
  return res.data; // { url }
};

// GET PAYMENTS (Admin)
export const getPayments = async () => {
  const res = await api.get("/payments");
  return res.data;
};