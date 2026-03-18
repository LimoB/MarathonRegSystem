import { Routes, Route, Navigate } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";
import AdminRoutes from "./AdminRoutes";
import AthleteRoutes from "./AthleteRoutes";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      {PublicRoutes()}

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {AdminRoutes()}
      </Route>

      {/* ATHLETE */}
      <Route
        path="/athlete"
        element={
          <ProtectedRoute allowedRoles={["athlete"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {AthleteRoutes()}
      </Route>

      {/* DEFAULT REDIRECT */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;