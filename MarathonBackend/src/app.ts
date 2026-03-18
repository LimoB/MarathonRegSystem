import express, { Application, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

// Middleware
import { logger } from "./middleware/logger";
import { authMiddleware } from "./middleware/authMiddleware";
// import { errorHandler } from "./middleware/errorHandler";

// Routers
import authRouter from "./auth/auth.route";
import userRouter from "./users/user.route";
import marathonRouter from "./marathons/marathon.route";
import registrationRouter from "./registrations/registration.route";
import paymentRouter from "./payments/payment.route";

const app: Application = express();

// =========================
// CORS CONFIGURATION
// =========================
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// =========================
// CORE MIDDLEWARE
// =========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// =========================
// HEALTH CHECK ROUTE
// =========================
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "🏃 Marathon Registration API is running",
  });
});

// =========================
// PUBLIC ROUTES
// =========================
app.use("/api/auth", authRouter);

// =========================
// PROTECTED ROUTES
// =========================
// authMiddleware is applied inside the routers or here for bulk protection
app.use("/api/users", userRouter); 
app.use("/api/marathons", marathonRouter);
app.use("/api/registrations", registrationRouter);
app.use("/api/payments", paymentRouter);

// =========================
// GLOBAL ERROR HANDLER
// =========================
// app.use(errorHandler);

export default app;