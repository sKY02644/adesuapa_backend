import express from "express";
import { rateLimitingMiddleware } from '../middlewares/rate-limiting';
import { CountryController } from "../controllers/country";

const router = express.Router();


/**
 * Lookup employees details
 */
router.get("/countries/:status?/:countryId?/", rateLimitingMiddleware,  CountryController.get);

export = router;