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
exports.saveTestUserData = void 0;
const dotenv_1 = require("dotenv");
//==========
const test_user_data_1 = require("../../db/models/test-user-data");
const bot_1 = require("../../bot");
(0, dotenv_1.config)();
const isProd = process.env['NODE_ENV'] === 'production';
const saveTestUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInformation = req.body.userInformation;
        const ip = req.headers['x-forwarded-for']
            ? req.headers['x-forwarded-for'].split(',')[0].trim()
            : req.socket.remoteAddress || 'Unknown';
        if (isProd) {
            yield test_user_data_1.TestsUserDataModel.create(Object.assign(Object.assign({}, userInformation), { ip, results: userInformation.categoryName }));
            const lastSale = yield test_user_data_1.TestsUserDataModel.findOne({
                testName: userInformation.testName,
            }).sort({
                createdAt: -1,
            });
            if (lastSale) {
                yield (0, bot_1.notifyNewSale)(lastSale);
            }
        }
        return res.status(201).send({ userInformation });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.saveTestUserData = saveTestUserData;
