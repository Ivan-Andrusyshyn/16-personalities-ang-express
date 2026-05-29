"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// ========
const getQuestions_controller_1 = __importDefault(require("../../controllers/tests/be-yourself/getQuestions.controller"));
const getPercentages_controller_1 = __importDefault(require("../../controllers/tests/be-yourself/getPercentages.controller"));
const getTypeByResults_controller_1 = __importDefault(require("../../controllers/tests/be-yourself/getTypeByResults.controller"));
const getDayPhrases_controller_1 = __importDefault(require("../../controllers/tests/be-yourself/getDayPhrases.controller"));
const get_calculate_results_controller_1 = __importDefault(require("../../controllers/tests/be-yourself/calculator/get-calculate-results.controller"));
const get_calculator_information_controller_1 = __importDefault(require("../../controllers/tests/be-yourself/calculator/get-calculator-information.controller"));
const get_calculator_disclaimer_controller_1 = __importDefault(require("../../controllers/tests/be-yourself/calculator/get-calculator-disclaimer.controller"));
const test_answers_validator_1 = require("../../validators/test-answers.validator");
const beYourselfRouter = (0, express_1.default)();
beYourselfRouter.post('/be-yourself/results', test_answers_validator_1.testAnswersValidator, getPercentages_controller_1.default);
beYourselfRouter.post('/be-yourself/calculator', get_calculate_results_controller_1.default);
beYourselfRouter.get('/be-yourself/calculator-information', get_calculator_information_controller_1.default);
beYourselfRouter.get('/be-yourself/calculator-disclaimer', get_calculator_disclaimer_controller_1.default);
beYourselfRouter.get('/be-yourself', getQuestions_controller_1.default);
beYourselfRouter.get('/be-yourself/person-type/:personType', getTypeByResults_controller_1.default);
beYourselfRouter.get('/be-yourself/personalities-phrases', getDayPhrases_controller_1.default);
exports.default = beYourselfRouter;
