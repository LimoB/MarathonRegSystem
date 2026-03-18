import { Request, Response } from "express";
import { registerService, loginService } from "./auth.service";

const allowedRoles = ["athlete", "admin"] as const;

export const registerController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { first_name, last_name, email, password, role, phone, dob } = req.body;

    // Validation
    if (!first_name || !last_name || !email || !password) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    if (role && !allowedRoles.includes(role)) {
      res.status(400).json({ error: "Invalid role. Must be 'athlete' or 'admin'" });
      return;
    }

    const user = await registerService({
      first_name,
      last_name,
      email,
      password_hash: password, // passed as plain text to service, which hashes it
      role: role || "athlete",
      phone,
      dob: dob ? new Date(dob) : null,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const result = await loginService(email, password);
    res.status(200).json({ message: "Login successful", ...result });
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
};