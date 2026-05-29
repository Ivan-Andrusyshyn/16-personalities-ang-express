"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// ===
const testPessingCounter_controller_1 = __importDefault(require("../../controllers/tests/common-tests/testPessingCounter.controller"));
const save_results_controller_1 = __importDefault(require("../../controllers/tests/common-tests/save-results.controller"));
const get_results_controller_1 = __importDefault(require("../../controllers/tests/common-tests/get-results.controller"));
const generate_pdf_controller_1 = __importDefault(require("../../controllers/tests/common-tests/generate-pdf/generate-pdf.controller"));
const commonTestRoute = (0, express_1.default)();
commonTestRoute.get('/counter-tests', testPessingCounter_controller_1.default);
commonTestRoute.post('/generate-pdf', generate_pdf_controller_1.default);
commonTestRoute.post('/save-results', save_results_controller_1.default);
commonTestRoute.get('/get-results/:testName', get_results_controller_1.default);
exports.default = commonTestRoute;
