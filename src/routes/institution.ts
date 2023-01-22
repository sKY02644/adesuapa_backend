import express from "express";
import { rateLimitingMiddleware } from '../middlewares/rate-limiting';
import { InstitutionController } from "../controllers/institution";

const router = express.Router();


/**
 * Lookup employees details
 */
router.get("/institutions/:status?/:institutionId?", rateLimitingMiddleware,  InstitutionController.get);

export = router;