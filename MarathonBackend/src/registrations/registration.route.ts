import { Router } from "express";
import { 
  registerForMarathon, 
  getMyRegistrations, 
  getRegistrations, 
  updateRegistration, 
  deleteRegistration 
} from "./registration.controller";
import { authMiddleware, adminOnly, athleteOnly } from "../middleware/authMiddleware";

export const registrationRouter = Router();

/* ================================
   ADMIN ROUTES
================================ */
registrationRouter.get("/", authMiddleware, adminOnly, getRegistrations);
registrationRouter.put("/:id", authMiddleware, adminOnly, updateRegistration);
registrationRouter.delete("/:id", authMiddleware, adminOnly, deleteRegistration);

/* ================================
   ATHLETE ROUTES
================================ */
registrationRouter.post("/", authMiddleware, athleteOnly, registerForMarathon);
registrationRouter.get("/my-registrations", authMiddleware, athleteOnly, getMyRegistrations);

export default registrationRouter;