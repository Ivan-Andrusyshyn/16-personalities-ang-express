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
exports.updateDocModel = exports.checkProperty = void 0;
exports.generateReference = generateReference;
exports.getFromServerToKyivTime = getFromServerToKyivTime;
const crypto_1 = require("crypto");
function generateReference() {
    return `inv-${(0, crypto_1.randomUUID)()}`;
}
function getFromServerToKyivTime() {
    const time = new Date();
    return new Date(time.getTime() + 3 * 60 * 60 * 1000);
}
const checkProperty = (res, monopaymentObject) => __awaiter(void 0, void 0, void 0, function* () {
    if (!monopaymentObject ||
        !monopaymentObject.amount ||
        !monopaymentObject.merchantPaymInfo) {
        return res.status(400).json({ message: "Invalid payment data" });
    }
});
exports.checkProperty = checkProperty;
const updateDocModel = (updatedDoc, invoiceId, testName) => __awaiter(void 0, void 0, void 0, function* () {
    const nowKyiv = getFromServerToKyivTime();
    const now = nowKyiv.getTime();
    const paidAtDate = (updatedDoc === null || updatedDoc === void 0 ? void 0 : updatedDoc.paidAt) ? new Date(updatedDoc.paidAt) : null;
    const paidAt = paidAtDate ? paidAtDate.getTime() : 0;
    const TWO_HOURS = 1000 * 60 * 60 * 2;
    if (now - paidAt > TWO_HOURS) {
        return {
            invoiceId,
            testName,
            status: "failed",
            reason: "Access expired",
        };
    }
    const expiredAtDate = new Date(paidAt + TWO_HOURS);
    return {
        invoiceId,
        status: "success",
        testName,
        paidAt: paidAtDate,
        expiredAtTimestamp: expiredAtDate.getTime(),
        expiredAt: expiredAtDate,
    };
});
exports.updateDocModel = updateDocModel;
