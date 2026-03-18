import { Request, Response, NextFunction } from "express";
import * as registrationService from "./registration.service";

export const getRegistrations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await registrationService.getRegistrationsService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const registerForMarathon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const athlete_id = (req as any).user?.userId;
    const { marathon_id, category } = req.body;

    if (!athlete_id) return res.status(401).json({ message: "Unauthorized" });

    const registration = await registrationService.createRegistrationService({
      athlete_id,
      marathon_id,
      category,
      payment_status: "pending",
    });

    res.status(201).json({ message: "Registration created successfully", registration });
  } catch (error) {
    next(error);
  }
};

export const getMyRegistrations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const athlete_id = (req as any).user?.userId;
    const data = await registrationService.getAthleteRegistrationsService(athlete_id!);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateRegistration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = await registrationService.updateRegistrationService(Number(req.params.id), req.body);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

export const deleteRegistration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await registrationService.deleteRegistrationService(Number(req.params.id));
    if (!deleted) return res.status(404).json({ message: "Registration not found" });
    res.status(200).json({ message: "Registration deleted successfully" });
  } catch (error) {
    next(error);
  }
};