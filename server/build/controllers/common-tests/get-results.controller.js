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
// ====
const redise_service_1 = require("../../services/redise.service");
const getResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { testName } = req.params;
        if (!testName) {
            return res.status(400).json({
                message: 'testName is required',
            });
        }
        const userIp = ((_a = req.headers['x-forwarded-for']) === null || _a === void 0 ? void 0 : _a.toString().split(',')[0]) ||
            req.socket.remoteAddress ||
            'unknown';
        const key = `test-results-list:${userIp}:${testName}`;
        const data = yield redise_service_1.redisService.get(key);
        if (!data) {
            return res.status(404).json({
                message: 'Result not found or expired',
            });
        }
        return res.status(200).json(data);
    }
    catch (error) {
        console.error('Get results error:', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});
exports.default = getResults;
