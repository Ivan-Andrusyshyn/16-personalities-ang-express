import { config } from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { BotSubscribersSchema } from '../db/models/bot-subscrivers.shema';

let botInstance: TelegramBot | null = null;
config();

const BOT_TOKEN = process.env.TG_BOT_TOKEN!;
if (!BOT_TOKEN) {
  console.error('❌ BOT_TOKEN не задано в .env файлі');
  process.exit(1);
}

export function initBot() {
  if (botInstance) return botInstance;

  botInstance = new TelegramBot(BOT_TOKEN, {
    polling: { interval: 300, autoStart: true },
  });
  if (botInstance) {
    botInstance.onText(/\/start/, async (msg) => {
      const chatId = msg.chat.id;

      try {
        await BotSubscribersSchema.findOneAndUpdate(
          { chatId },
          { chatId },
          { upsert: true, new: true },
        );

        await botInstance?.sendMessage(
          chatId,
          '✅ Ви успішно підписалися на сповіщення про нові покупки тестів!',
        );
      } catch (error) {
        console.error('Помилка підписки користувача:', error);
        await botInstance?.sendMessage(
          chatId,
          '❌ Сталася помилка при підписці. Спробуйте пізніше.',
        );
      }
    });
  }

  return botInstance;
}

export function getBot() {
  if (!botInstance) {
    throw new Error('Bot not initialized');
  }
  return botInstance;
}
