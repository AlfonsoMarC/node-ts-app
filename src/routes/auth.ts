import { Router, RequestHandler } from "express";
import { loginController, registerController } from "@/controllers/auth";
import { check } from "express-validator";
import { checkValidator } from "@/middlewares/checkValidator";
import { checkEmailExists, checkHaskRole, checkUsernameExists } from "@/helpers/checkValidators";
import { validateJWT } from "@/middlewares/validateJwt";

const router = Router();

router.post(
  "/login",
  [
    check("email", "The email is not valid").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    checkValidator
  ],
  loginController as RequestHandler
);

router.post(
  "/register",
  [
    validateJWT,
    check("email", "The email is not valid").isEmail(),
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("role").custom(checkHaskRole),
    check("email").custom(checkEmailExists),
    check("username").custom(checkUsernameExists),
    checkValidator
  ],
  registerController as RequestHandler
);

// router.post("/refresh", expressjwt({ secret: process.env.SECRET_JWT_SEED }), () => {});

export default router;
