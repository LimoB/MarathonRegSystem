import api from "./axios";

// TYPES
export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role?: "athlete" | "admin";
  phone?: string;
  dob?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// REGISTER
export const registerUser = async (data: RegisterPayload) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// LOGIN
export const loginUser = async (data: LoginPayload) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

// LOGOUT
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};