import express from "express";
import { rateLimitingMiddleware } from '../middlewares/rate-limiting';
import { SubscriptionController } from "../controllers/subscription";

const router = express.Router();


/**
 * Lookup employees details
 */
router.get("/subscriptions/:subscriptionId?", rateLimitingMiddleware,  SubscriptionController.get);

export = router;