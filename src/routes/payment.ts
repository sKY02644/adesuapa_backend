import express from "express";
import { rateLimitingMiddleware } from '../middlewares/rate-limiting';
import { PaymentController } from "../controllers/payment";

const router = express.Router();


/**
 * Lookup employees details
 */
router.get("/payment/:paymentId?", rateLimitingMiddleware,  PaymentController.get);

router.post("/payment/initialize", rateLimitingMiddleware,  PaymentController.initialize);

router.post("/payment/webhook", rateLimitingMiddleware,  PaymentController.webhook);

export = router;