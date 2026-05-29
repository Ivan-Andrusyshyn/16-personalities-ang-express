"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//
//
const monopay_controller_1 = require("../controllers/payment/monopay.controller");
const checkPayment_middleware_1 = require("../middleware/checkPayment.middleware");
const get_bills_controller_1 = __importDefault(require("../controllers/payment/get-bills.controller"));
const monoRouter = express_1.default.Router();
monoRouter.post('/create-payment', monopay_controller_1.createPayment);
monoRouter.get('/check-status', checkPayment_middleware_1.checkPaymentMiddleware, monopay_controller_1.checkStatusPayment);
monoRouter.get('/client-info', monopay_controller_1.clientInfo);
monoRouter.post('/set-webhook', monopay_controller_1.setWebhook);
monoRouter.post('/get-webhook', monopay_controller_1.getWebhook);
monoRouter.get('/get-bills', get_bills_controller_1.default);
exports.default = monoRouter;
