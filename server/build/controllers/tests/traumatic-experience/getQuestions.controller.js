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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// =============
const google_file_ids_env_1 = require("../../../utils/google-file-ids-env");
const test_data_service_1 = __importDefault(require("../../../services/test-data.service"));
const getQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const questionsWithAnswers: Question[] = createTraumaticSensitivityTest();
        const fileId = google_file_ids_env_1.TRAUMATIC_EXPERIENCE.QUESTIONS;
        const data = yield test_data_service_1.default.getTestGoogleOrMongo('traumatic-experience-questions', fileId);
        //
        const normalizeId = data.map((i, index) => (Object.assign({ id: index + 1 }, i._doc)));
        //
        res.status(200).send({
            questions: normalizeId,
            message: 'Succesfull get all questions!',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Internal server Error' });
    }
});
exports.default = getQuestions;
