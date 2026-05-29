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
//
const redise_service_1 = require("../../services/redise.service");
const saveResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { testName, result } = req.body;
        if (!testName || !result.title || !result.personalityName) {
            return res.status(400).json({
                message: 'testName and result are required',
            });
        }
        const userIp = ((_a = req.headers['x-forwarded-for']) === null || _a === void 0 ? void 0 : _a.toString().split(',')[0]) ||
            req.socket.remoteAddress ||
            'unknown';
        const key = `test-results-list:${userIp}:${testName}`;
        const data = (_b = (yield redise_service_1.redisService.get(key))) !== null && _b !== void 0 ? _b : {
            results: [],
        };
        console.log(data);
        yield redise_service_1.redisService.set(key, { results: [...data === null || data === void 0 ? void 0 : data.results, result] }, 60 * 60 * 2);
        return res.status(200).json({
            message: 'Successfully saved',
        });
    }
    catch (error) {
        console.error('Save results error:', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});
exports.default = saveResults;
