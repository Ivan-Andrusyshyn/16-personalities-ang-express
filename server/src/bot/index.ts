import { config } from 'dotenv';

// ============
import { BotSubscribersSchema } from '../db/models/bot-subscrivers.shema';
import { formatDate, formatTestName } from './helperts';
import { getBot } from './bot-instance';

config();

export async function notifyNewSale(data: any): Promise<void> {
  const bot = getBot();

  try {
    const text =
      `🆕 *Нова покупка тесту*\n\n` +
      `🧠 *Тест:* ${formatTestName(data.testName)}\n` +
      `💰 *Ціна:* ${data.testPrice || '—'}\n` +
      `📊 *Результат:* ${data.results || '—'}\n\n` +
      `🕒 *Час:* ${formatDate(data.createdAt)}\n` +
      `🌐 *IP:* ${data.ip || '—'}\n` +
      `📱 *Пристрій:* ${data.device || '—'}\n` +
      `🔗 *Джерело:* ${data.referrer || '—'}`;

    const subscribers = await BotSubscribersSchema.find()
      .select('chatId')
      .lean();

    if (subscribers.length === 0) {
      console.log('Немає підписників для надсилання сповіщення');
      return;
    }

    const sendPromises = subscribers.map(({ chatId }) =>
      bot.sendMessage(chatId, text, { parse_mode: 'Markdown' }).catch((err) => {
        console.error(
          `Не вдалося надіслати повідомлення до ${chatId}:`,
          err.message,
        );
      }),
    );

    await Promise.all(sendPromises);
  } catch (err: any) {
    console.error('Notify error:', err.message);
  }
}
