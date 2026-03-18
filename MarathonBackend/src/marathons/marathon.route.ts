import { Router } from "express";
import {
  getMarathons,
  getMarathonById,
  createMarathon,
  updateMarathon,
  deleteMarathon
} from "./marathon.controller";
import { authMiddleware, adminOnly } from "../middleware/authMiddleware";

export const marathonRouter = Router();

/* ================================
   PUBLIC / AUTHENTICATED ROUTES
================================ */
// Anyone logged in can see the list of marathons
marathonRouter.get("/", authMiddleware, getMarathons);
marathonRouter.get("/:id", authMiddleware, getMarathonById);

/* ================================
   ADMIN ONLY ROUTES
================================ */
marathonRouter.post("/", authMiddleware, adminOnly, createMarathon);
marathonRouter.put("/:id", authMiddleware, adminOnly, updateMarathon);
marathonRouter.delete("/:id", authMiddleware, adminOnly, deleteMarathon);

export default marathonRouter;