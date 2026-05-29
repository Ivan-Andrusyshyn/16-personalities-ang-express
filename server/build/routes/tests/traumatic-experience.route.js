"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//========
const getQuestions_controller_1 = __importDefault(require("../../controllers/tests/traumatic-experience/getQuestions.controller"));
const countPersonPercentages_controller_1 = __importDefault(require("../../controllers/tests/traumatic-experience/countPersonPercentages.controller"));
const getEmotionTypeByResults_controller_1 = __importDefault(require("../../controllers/tests/traumatic-experience/getEmotionTypeByResults.controller"));
const getTestInformation_controller_1 = __importDefault(require("../../controllers/tests/traumatic-experience/getTestInformation.controller"));
const test_answers_validator_1 = require("../../validators/test-answers.validator");
const traumExperienceRouter = (0, express_1.default)();
traumExperienceRouter.post('/traumatic-experience/results', test_answers_validator_1.testAnswersValidator, countPersonPercentages_controller_1.default);
traumExperienceRouter.get('/traumatic-experience', getQuestions_controller_1.default);
traumExperienceRouter.get('/traumatic-experience/information', getTestInformation_controller_1.default);
traumExperienceRouter.get('/traumatic-experience/emotion-type/:emotionType', getEmotionTypeByResults_controller_1.default);
exports.default = traumExperienceRouter;
