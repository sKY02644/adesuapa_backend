import express from "express";
import { AuthController } from "../controllers/auth";
import { rateLimitingMiddleware, loginLimiter } from '../middlewares/rate-limiting';

import { LookupSchema } from "../utils/schemas";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";
import { validateReqBody } from "../middlewares/validate-body";

import { validateRequest } from "../middlewares/validate-request";
import { authValidator } from "../middlewares/validation-rules/auth";

const router = express.Router();

/**
 *  Sigin users
 */
router.post("/auth/signin", loginLimiter, AuthController.login);

// /**
//  * Signout Users
//  */
// router.post("/auth/signout", currentUser, requireAuth, AuthController.logout);

/**
 * Lookup employees details
 */
router.get("/lookup/:id?/:type?/:institutionid?", rateLimitingMiddleware, AuthController.lookup);

router.post("/auth/reset-password/:stage?", rateLimitingMiddleware, AuthController.resetPassword)


export = router;