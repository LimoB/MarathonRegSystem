import { Route } from "react-router-dom";

import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";

import Marathons from "../pages/admin/marathons/Marathons";
import AddMarathon from "../pages/admin/marathons/AddMarathon";

import Registrations from "../pages/admin/registrations/Registrations";

import Payments from "../pages/admin/payments/Payments";

import Users from "../pages/admin/users/Users";

const AdminRoutes = () => {
  return (
    <>
      {/* Dashboard */}
      <Route path="dashboard" element={<AdminDashboard />} />

      {/* Marathons */}
      <Route path="marathons" element={<Marathons />} />
      <Route path="marathons/create" element={<AddMarathon />} />

      {/* Registrations */}
      <Route path="registrations" element={<Registrations />} />

      {/* Payments */}
      <Route path="payments" element={<Payments />} />

      {/* Users */}
      <Route path="users" element={<Users />} />
    </>
  );
};

export default AdminRoutes;