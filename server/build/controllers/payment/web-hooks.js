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
exports.setWebhook = exports.getWebhook = void 0;
const mono_payment_schema_1 = require("../../db/models/mono-payment-schema");
const getWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const body = req.body;
        const invoiceId = (_a = body === null || body === void 0 ? void 0 : body.data) === null || _a === void 0 ? void 0 : _a.invoiceId;
        if (!invoiceId)
            return res.status(400).send('No invoiceId');
        yield mono_payment_schema_1.PaymentModel.updateOne({ invoiceId }, { $set: { status: 'success' } });
        res.sendStatus(200);
    }
    catch (error) {
        res.status(500).json({ message: 'Mono API error', error });
    }
});
exports.getWebhook = getWebhook;
const setWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req.body;
        const result = yield monoService.setWebhook(url);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: 'Mono API error', error });
    }
});
exports.setWebhook = setWebhook;
