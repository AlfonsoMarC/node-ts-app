import { Router, RequestHandler } from "express";
import { createTripController, getTripsController } from "@/controllers/trip";
import { check } from "express-validator";
import { validateJWT } from "@/middlewares/validateJwt";

const router = Router();

router.post(
  "/",
  validateJWT,
  check("name", "Trip name is required").not().isEmpty(),
  createTripController as RequestHandler
);

router.get("/", getTripsController as RequestHandler);

export default router;
