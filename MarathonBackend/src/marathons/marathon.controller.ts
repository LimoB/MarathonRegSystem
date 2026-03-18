import { Request, Response, NextFunction } from "express";
import * as marathonService from "./marathon.service";

export const getMarathons = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await marathonService.getMarathonsService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getMarathonById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const data = await marathonService.getMarathonByIdService(id);
    if (!data) return res.status(404).json({ message: "Marathon not found" });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const createMarathon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminId = (req as any).user?.userId;
    const marathon = await marathonService.createMarathonService({
      ...req.body,
      created_by: adminId,
    });
    res.status(201).json({ message: "Marathon created successfully", marathon });
  } catch (error) {
    next(error);
  }
};

export const updateMarathon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = await marathonService.updateMarathonService(Number(req.params.id), req.body);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

export const deleteMarathon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await marathonService.deleteMarathonService(Number(req.params.id));
    if (!deleted) return res.status(404).json({ message: "Marathon not found" });
    res.status(200).json({ message: "Marathon deleted successfully" });
  } catch (error) {
    next(error);
  }
};