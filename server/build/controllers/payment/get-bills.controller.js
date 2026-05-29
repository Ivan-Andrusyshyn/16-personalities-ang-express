"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mono_payment_schema_1 = require("../../db/models/mono-payment-schema");
const getBills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bills = yield mono_payment_schema_1.PaymentModel.find().sort({ createdAt: -1 });
        res.status(200).json(bills);
    }
    catch (err) {
        res.status(500).json({
            message: 'Error getting bills',
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.default = getBills;
