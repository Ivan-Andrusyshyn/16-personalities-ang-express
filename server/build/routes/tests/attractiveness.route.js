"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// ================
const getQuestions_controller_1 = __importDefault(require("../../controllers/tests/attractiveness/getQuestions.controller"));
const getAttractivenessName_controller_1 = __importDefault(require("../../controllers/tests/attractiveness/getAttractivenessName.controller"));
const getInfoByCategory_controller_1 = __importDefault(require("../../controllers/tests/attractiveness/getInfoByCategory.controller"));
const test_answers_validator_1 = require("../../validators/test-answers.validator");
const attractivenessRouter = (0, express_1.default)();
attractivenessRouter.get('/attractiveness', getQuestions_controller_1.default);
attractivenessRouter.get('/attractiveness/category/:categoryName', getInfoByCategory_controller_1.default);
attractivenessRouter.post('/attractiveness/category', test_answers_validator_1.testAnswersValidator, getAttractivenessName_controller_1.default);
exports.default = attractivenessRouter;
