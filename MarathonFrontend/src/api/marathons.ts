import api from "./axios";

// TYPES
export interface Marathon {
  id: number;
  name: string;
  location: string;
  date: string;
  distance_km: number;
  sponsor_name?: string;
  organizer_name?: string;
  created_by: number;
  created_at: string;
}

export interface CreateMarathonPayload {
  name: string;
  location: string;
  date: string;
  distance_km: number;
  sponsor_name?: string;
  organizer_name?: string;
}

// GET ALL
export const getMarathons = async () => {
  const res = await api.get("/marathons");
  return res.data;
};

// GET ONE
export const getMarathonById = async (id: number) => {
  const res = await api.get(`/marathons/${id}`);
  return res.data;
};

// CREATE (ADMIN)
export const createMarathon = async (data: CreateMarathonPayload) => {
  const res = await api.post("/marathons", data);
  return res.data;
};

// UPDATE (ADMIN)
export const updateMarathon = async (
  id: number,
  data: Partial<CreateMarathonPayload>
) => {
  const res = await api.put(`/marathons/${id}`, data);
  return res.data;
};

// DELETE (ADMIN)
export const deleteMarathon = async (id: number) => {
  const res = await api.delete(`/marathons/${id}`);
  return res.data;
};