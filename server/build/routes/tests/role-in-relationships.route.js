"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// ===============
const getQuestions_controller_1 = __importDefault(require("../../controllers/tests/role-in-relationships-test/getQuestions.controller"));
const getCategoryName_controller_1 = __importDefault(require("../../controllers/tests/role-in-relationships-test/getCategoryName.controller"));
const getInfoByCategory_controller_1 = __importDefault(require("../../controllers/tests/role-in-relationships-test/getInfoByCategory.controller"));
const getTestInformation_controller_1 = __importDefault(require("../../controllers/tests/role-in-relationships-test/getTestInformation.controller"));
const test_answers_validator_1 = require("../../validators/test-answers.validator");
const roleInRelationshipsRouter = (0, express_1.default)();
roleInRelationshipsRouter.get('/role-in-relationships', getQuestions_controller_1.default);
roleInRelationshipsRouter.get('/role-in-relationships/category/:categoryName', getInfoByCategory_controller_1.default);
roleInRelationshipsRouter.get('/role-in-relationships/information', getTestInformation_controller_1.default);
roleInRelationshipsRouter.post('/role-in-relationships/category', test_answers_validator_1.testAnswersValidator, getCategoryName_controller_1.default);
exports.default = roleInRelationshipsRouter;
