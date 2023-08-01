import { HttpStatusCodes } from "@/constants/httpStatusCodes";
import { createTripService, getTripsServices } from "@/services/trip";
import { ITrip } from "@/types/models/trip";
import { Request, Response, NextFunction } from "express";

const { HTTP_CREATED, HTTP_OK } = HttpStatusCodes;

export const createTripController = async (req: Request, res: Response, next: NextFunction) => {
  const { name, startDate, endDate }: ITrip = req.body;
  const { uid } = req;
  const trip = { name, startDate, endDate, uid };
  try {
    const createdTrip = await createTripService(trip);
    return res.status(HTTP_CREATED).json(createdTrip);
  } catch (err) {
    next(err);
  }
};

export const getTripsController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const trips = await getTripsServices();
    return res.status(HTTP_OK).json(trips);
  } catch (err) {
    next(err);
  }
};
