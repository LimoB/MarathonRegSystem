import axios from "./axios";

// ────────────────────────────────
// TYPES
// ────────────────────────────────
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: "admin" | "athlete";
  phone?: string;
  dob?: string;
  created_at?: string;
}

// ────────────────────────────────
// ADMIN APIS
// ────────────────────────────────
export const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get("/users");
  return data;
};

export const getUserById = async (id: number): Promise<User> => {
  const { data } = await axios.get(`/users/${id}`);
  return data;
};

export const createUser = async (user: Partial<User> & { password_hash: string }): Promise<User> => {
  const { data } = await axios.post("/users", user);
  return data.user;
};

export const updateUser = async (id: number, updates: Partial<User> & { password_hash?: string }): Promise<string> => {
  const { data } = await axios.put(`/users/${id}`, updates);
  return data.message;
};

export const deleteUser = async (id: number): Promise<string> => {
  const { data } = await axios.delete(`/users/${id}`);
  return data.message;
};

// ────────────────────────────────
// ATHLETE / PROFILE
// ────────────────────────────────
export const updateProfile = async (updates: Partial<User> & { password_hash?: string }): Promise<string> => {
  const { data } = await axios.put("/users/profile/me", updates);
  return data.message;
};