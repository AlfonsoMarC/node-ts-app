import Trip from "@/models/Trip";
import { ITrip } from "@/types/models/trip";

export const createTripService = async (trip: ITrip) => {
  const createdTrip = new Trip(trip);
  await createdTrip.save();
  return createdTrip;
};

export const getTripsServices = async () => {
  const trips = await Trip.find();
  return trips;
};
