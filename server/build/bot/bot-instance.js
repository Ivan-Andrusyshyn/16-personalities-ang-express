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
exports.initBot = initBot;
exports.getBot = getBot;
const dotenv_1 = require("dotenv");
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const bot_subscrivers_shema_1 = require("../db/models/bot-subscrivers.shema");
let botInstance = null;
(0, dotenv_1.config)();
const BOT_TOKEN = process.env.TG_BOT_TOKEN;
if (!BOT_TOKEN) {
    console.error('❌ BOT_TOKEN не задано в .env файлі');
    process.exit(1);
}
function initBot() {
    if (botInstance)
        return botInstance;
    botInstance = new node_telegram_bot_api_1.default(BOT_TOKEN, {
        polling: { interval: 300, autoStart: true },
    });
    if (botInstance) {
        botInstance.onText(/\/start/, (msg) => __awaiter(this, void 0, void 0, function* () {
            const chatId = msg.chat.id;
            try {
                yield bot_subscrivers_shema_1.BotSubscribersSchema.findOneAndUpdate({ chatId }, { chatId }, { upsert: true, new: true });
                yield (botInstance === null || botInstance === void 0 ? void 0 : botInstance.sendMessage(chatId, '✅ Ви успішно підписалися на сповіщення про нові покупки тестів!'));
            }
            catch (error) {
                console.error('Помилка підписки користувача:', error);
                yield (botInstance === null || botInstance === void 0 ? void 0 : botInstance.sendMessage(chatId, '❌ Сталася помилка при підписці. Спробуйте пізніше.'));
            }
        }));
    }
    return botInstance;
}
function getBot() {
    if (!botInstance) {
        throw new Error('Bot not initialized');
    }
    return botInstance;
}
