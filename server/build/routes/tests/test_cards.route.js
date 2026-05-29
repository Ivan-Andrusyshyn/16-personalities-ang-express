"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//==========
const test_cards_controller_1 = require("../../controllers/tests/common-tests/test-cards.controller");
const testCardsRouter = (0, express_1.Router)();
testCardsRouter.get('/main', test_cards_controller_1.getTestCards);
testCardsRouter.put('/main', test_cards_controller_1.changeTestPrice);
exports.default = testCardsRouter;
