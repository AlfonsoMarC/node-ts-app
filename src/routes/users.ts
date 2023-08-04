import { RequestHandler, Router } from "express";
import { createUserController, deleteUserController } from "@/controllers/users";
import { validateIsAdminUser } from "@/middlewares/validateIsAdminUser";
import { validateJWT } from "@/middlewares/validateJwt";
import { check } from "express-validator";
import {
  checkEmailExists,
  checkHasValidRole,
  checkUsernameExists
} from "@/helpers/checkValidators";
import { checkValidator } from "@/middlewares/checkValidator";
import User from "@/models/User";
import { asyncMiddleware } from "@/middlewares/asyncMiddleware";
import { validateModelExistsById } from "@/middlewares/validateModelExistsById";

const router = Router();

router.post(
  "/",
  [
    asyncMiddleware(validateJWT),
    validateIsAdminUser,
    check("email", "The email is not valid").isEmail(),
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("role").custom(role => checkHasValidRole({ role, allowAdminUser: true })),
    check("email").custom(checkEmailExists),
    check("username").custom(checkUsernameExists),
    checkValidator
  ],
  createUserController as RequestHandler
);

router.delete(
  "/:id",
  [
    asyncMiddleware(validateJWT),
    validateIsAdminUser,
    check("id", "Invalid id").isMongoId(),
    checkValidator,
    asyncMiddleware(validateModelExistsById(User))
  ],
  deleteUserController as RequestHandler
);

export default router;
