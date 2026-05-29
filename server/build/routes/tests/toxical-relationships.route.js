"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// ========
const getNameCategoryByScore_controller_1 = __importDefault(require("../../controllers/tests/toxical-relationships/getNameCategoryByScore.controller"));
const getQuestions_controller_1 = __importDefault(require("../../controllers/tests/toxical-relationships/getQuestions.controller"));
const getDetailsCategory_controller_1 = __importDefault(require("../../controllers/tests/toxical-relationships/getDetailsCategory.controller"));
const getTestInformation_controller_1 = __importDefault(require("../../controllers/tests/toxical-relationships/getTestInformation.controller"));
const test_answers_validator_1 = require("../../validators/test-answers.validator");
const relationshipRoute = (0, express_1.default)();
relationshipRoute.get('/toxical-relationships', getQuestions_controller_1.default);
relationshipRoute.get('/toxical-relationships/information', getTestInformation_controller_1.default);
relationshipRoute.post('/toxical-relationships/category', test_answers_validator_1.testAnswersValidator, getNameCategoryByScore_controller_1.default);
relationshipRoute.get('/toxical-relationships/results/:categoryName', getDetailsCategory_controller_1.default);
exports.default = relationshipRoute;
