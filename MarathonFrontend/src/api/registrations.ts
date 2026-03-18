import api from "./axios";

// TYPES
export interface Registration {
  user: any;
  id: number;
  athlete_id: number;
  marathon_id: number;
  category: string;
  payment_status: "pending" | "completed";
  registration_date: string;

  // relations (optional depending on backend response)
  marathon?: {
    id: number;
    name: string;
    location: string;
    date: string;
  };

  athlete?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

// CREATE REGISTRATION (ATHLETE)
export const registerForMarathon = async (data: {
  marathon_id: number;
  category: string;
}) => {
  const res = await api.post("/registrations", data);
  return res.data;
};

// GET MY REGISTRATIONS (ATHLETE)
export const getMyRegistrations = async () => {
  const res = await api.get("/registrations/my-registrations");
  return res.data;
};

// GET ALL REGISTRATIONS (ADMIN)
export const getRegistrations = async () => {
  const res = await api.get("/registrations");
  return res.data;
};

// UPDATE REGISTRATION (ADMIN)
export const updateRegistration = async (
  id: number,
  data: Partial<{
    category: string;
    payment_status: "pending" | "completed";
  }>
) => {
  const res = await api.put(`/registrations/${id}`, data);
  return res.data;
};

// DELETE REGISTRATION (ADMIN)
export const deleteRegistration = async (id: number) => {
  const res = await api.delete(`/registrations/${id}`);
  return res.data;
};