"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCardsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const universalSchema = new mongoose_1.default.Schema({
    createdAt: { type: Date, default: Date.now },
}, { strict: false });
exports.TestCardsModel = mongoose_1.default.model('test-cards', universalSchema);
