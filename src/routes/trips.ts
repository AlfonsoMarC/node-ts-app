import { Router, RequestHandler } from "express";
import { createTripController, getTripsController } from "@/controllers/trip";
import { check } from "express-validator";
import { validateJWT } from "@/middlewares/validateJwt";
import { checkValidator } from "@/middlewares/checkValidator";
import { asyncMiddleware } from "@/middlewares/asyncMiddleware";

const router = Router();

router.post(
  "/",
  [
    asyncMiddleware(validateJWT),
    check("name", "Trip name is required").not().isEmpty(),
    checkValidator
  ],
  createTripController as RequestHandler
);

router.get("/", getTripsController as RequestHandler);

export default router;
