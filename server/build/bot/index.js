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
exports.notifyNewSale = notifyNewSale;
const dotenv_1 = require("dotenv");
// ============
const bot_subscrivers_shema_1 = require("../db/models/bot-subscrivers.shema");
const helperts_1 = require("./helperts");
const bot_instance_1 = require("./bot-instance");
(0, dotenv_1.config)();
function notifyNewSale(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const bot = (0, bot_instance_1.getBot)();
        try {
            const text = `🆕 *Нова покупка тесту*\n\n` +
                `🧠 *Тест:* ${(0, helperts_1.formatTestName)(data.testName)}\n` +
                `💰 *Ціна:* ${data.testPrice || '—'}\n` +
                `📊 *Результат:* ${data.results || '—'}\n\n` +
                `🕒 *Час:* ${(0, helperts_1.formatDate)(data.createdAt)}\n` +
                `🌐 *IP:* ${data.ip || '—'}\n` +
                `📱 *Пристрій:* ${data.device || '—'}\n` +
                `🔗 *Джерело:* ${data.referrer || '—'}`;
            const subscribers = yield bot_subscrivers_shema_1.BotSubscribersSchema.find()
                .select('chatId')
                .lean();
            if (subscribers.length === 0) {
                console.log('Немає підписників для надсилання сповіщення');
                return;
            }
            const sendPromises = subscribers.map(({ chatId }) => bot.sendMessage(chatId, text, { parse_mode: 'Markdown' }).catch((err) => {
                console.error(`Не вдалося надіслати повідомлення до ${chatId}:`, err.message);
            }));
            yield Promise.all(sendPromises);
        }
        catch (err) {
            console.error('Notify error:', err.message);
        }
    });
}
