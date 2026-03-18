import { Route } from "react-router-dom";

import AthleteDashboard from "../pages/athlete/dashboard/AthleteDashboard";

import Marathons from "../pages/athlete/marathons/Marathons";

import MyRegistrations from "../pages/athlete/registrations/MyRegistrations";

import MyPayments from "../pages/athlete/payments/MyPayments";

const AthleteRoutes = () => {
  return (
    <>
      {/* Dashboard */}
      <Route path="dashboard" element={<AthleteDashboard />} />

      {/* View Marathons */}
      <Route path="marathons" element={<Marathons />} />

      {/* Registrations */}
      <Route path="registrations" element={<MyRegistrations />} />

      {/* Payments */}
      <Route path="payments" element={<MyPayments />} />
    </>
  );
};

export default AthleteRoutes;