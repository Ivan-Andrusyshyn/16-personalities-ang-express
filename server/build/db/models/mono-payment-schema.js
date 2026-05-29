"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
const mongoose_1 = require("mongoose");
// =================
const helper_1 = require("../../controllers/payment/helper");
const PaymentSchema = new mongoose_1.Schema({
    invoiceId: { type: String, required: true, unique: true },
    testName: { type: String },
    status: {
        type: String,
        enum: ["created", "success", "failed"],
        default: "created",
    },
    paidAt: { type: Date },
}, {
    timestamps: {
        currentTime: helper_1.getFromServerToKyivTime,
    },
});
exports.PaymentModel = (0, mongoose_1.model)("test-payment", PaymentSchema);
