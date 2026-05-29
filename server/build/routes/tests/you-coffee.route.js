"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// ===========
const getQuestions_controller_1 = __importDefault(require("../../controllers/tests/you-coffee/getQuestions.controller"));
const getInfoByCategory_controller_1 = __importDefault(require("../../controllers/tests/you-coffee/getInfoByCategory.controller"));
const getCategoryName_controller_1 = __importDefault(require("../../controllers/tests/you-coffee/getCategoryName.controller"));
const test_answers_validator_1 = require("../../validators/test-answers.validator");
const youcoffee = (0, express_1.default)();
youcoffee.get('/you-coffee', getQuestions_controller_1.default);
youcoffee.get('/you-coffee/category/:categoryName', getInfoByCategory_controller_1.default);
youcoffee.post('/you-coffee/category', test_answers_validator_1.testAnswersValidator, getCategoryName_controller_1.default);
exports.default = youcoffee;
