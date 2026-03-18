import { Router } from "express";
import { createCheckoutSession, getPayments } from "./payment.controller";
import { authMiddleware, adminOnly, athleteOnly } from "../middleware/authMiddleware";

export const paymentRouter = Router();

// Athletes initiate payments
paymentRouter.post("/create-checkout-session", authMiddleware, athleteOnly, createCheckoutSession);

// Admins view payment history
paymentRouter.get("/", authMiddleware, adminOnly, getPayments);

export default paymentRouter;