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
// ============
const toxical_relationships_service_1 = __importDefault(require("../../../services/toxical-relationships.service"));
const test_user_data_1 = require("../../../db/models/test-user-data");
const getNameCategoryByScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { answers } = req.body;
        const categoryName = toxical_relationships_service_1.default.getNameCategoryByScore(answers);
        yield test_user_data_1.TestsUserDataModel.create({
            testName: "toxical-relationships",
            testPrice: "======COUNTER CLIENTS======",
        });
        res.status(200).send({
            message: "Success get relationship-sensitivity category!",
            categoryName,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ message: "Internal server Error" });
    }
});
exports.default = getNameCategoryByScore;
