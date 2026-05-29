"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postTestsResultGoogleSheet_controller_1 = __importDefault(require("../controllers/google/google-sheets/postTestsResultGoogleSheet.controller"));
const postRegistrationGoogleSheet_controller_1 = __importDefault(require("../controllers/google/google-sheets/postRegistrationGoogleSheet.controller"));
const getGoogleSheetData_controller_1 = __importDefault(require("../controllers/google/google-sheets/getGoogleSheetData.controller"));
const google_sheet_1 = require("../validators/google-sheet");
const postFeedBackGoogleSheet_controller_1 = __importDefault(require("../controllers/google/google-sheets/postFeedBackGoogleSheet.controller"));
const googleSheetRouer = (0, express_1.default)();
googleSheetRouer.post('/tests-results/send', postTestsResultGoogleSheet_controller_1.default);
googleSheetRouer.post('/registration/send', google_sheet_1.postRegistrationGoogleSheetValidator, postRegistrationGoogleSheet_controller_1.default);
googleSheetRouer.post('/feed-back/send', postFeedBackGoogleSheet_controller_1.default);
googleSheetRouer.get('/tests/data', getGoogleSheetData_controller_1.default);
exports.default = googleSheetRouer;
