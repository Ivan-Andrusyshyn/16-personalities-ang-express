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
Object.defineProperty(exports, "__esModule", { value: true });
const tests_data_schema_1 = require("../../../db/models/tests-data-schema");
const changeTestPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { testName, newPrice } = req.body;
        if (!testName || newPrice === undefined) {
            return res.status(400).send({ error: 'Invalid request body' });
        }
        const dbModel = (0, tests_data_schema_1.getUniversalModel)('test-cards');
        const updatedCard = (yield dbModel.findOneAndUpdate({ title: testName }, { price: newPrice }, { new: true }));
        if (!updatedCard) {
            return res.status(404).send({ error: 'Test card not found' });
        }
        res.status(200).send(updatedCard);
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = changeTestPrice;
