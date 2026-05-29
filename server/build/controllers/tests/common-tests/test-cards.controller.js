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
exports.changeTestPrice = exports.getTestCards = void 0;
// =================
const TEST_CARDS_1 = require("../../../content/TEST_CARDS");
const test_cards_shema_1 = require("../../../db/models/test-cards-shema");
const getTestCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = (yield test_cards_shema_1.TestCardsModel.find());
        if (!data.length) {
            yield test_cards_shema_1.TestCardsModel.create(TEST_CARDS_1.TEST_CARDS);
            data = yield test_cards_shema_1.TestCardsModel.find();
        }
        res.status(200).send(data);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getTestCards = getTestCards;
// =================
const changeTestPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { testName, newPrice } = req.body;
        if (!testName || newPrice === undefined) {
            return res.status(400).send({ error: 'Invalid request body' });
        }
        const updatedCard = (yield test_cards_shema_1.TestCardsModel.findOneAndUpdate({ testName }, { testPrice: newPrice }, { new: true }));
        if (!updatedCard) {
            return res.status(404).send({ error: 'Test card not found' });
        }
        const data = yield test_cards_shema_1.TestCardsModel.find();
        res.status(200).send(data);
    }
    catch (error) {
        console.log(error);
    }
});
exports.changeTestPrice = changeTestPrice;
