"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//==============
const get_user_data_controller_1 = require("../../controllers/tests-user-data/get-user.data.controller");
const save_user_data_controller_1 = require("../../controllers/tests-user-data/save-user-data.controller");
const test_user_data_validator_1 = require("../../validators/test-user-data.validator");
const testUserDataRoute = (0, express_1.default)();
testUserDataRoute.get('/all', get_user_data_controller_1.getAllTestsUserData);
testUserDataRoute.post('/save', test_user_data_validator_1.testUserDataValidator, save_user_data_controller_1.saveTestUserData);
exports.default = testUserDataRoute;
