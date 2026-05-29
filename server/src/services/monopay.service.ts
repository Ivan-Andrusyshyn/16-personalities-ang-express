// src/server/services/mono.service.ts
import axios from 'axios';

const MONO_API = 'https://api.monobank.ua';

export class MonoService {
  private readonly token: string;

  constructor() {
    this.token = process.env['MONO_TOKEN'] || '';
    // this.token = process.env['DEV_MONO_TOKEN'] || '';
    this.token =
      process.env.NODE_ENV === 'development'
        ? process.env['DEV_MONO_TOKEN'] || ''
        : process.env['MONO_TOKEN'] || '';
    if (!this.token) {
      throw new Error('MONO_TOKEN is not set in environment variables');
    }
  }
  async createPayment(data: any) {
    const res = await fetch(`${MONO_API}/api/merchant/invoice/create`, {
      method: 'POST',
      headers: {
        'X-Token': this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Failed to create payment: ${res.status} - ${error}`);
    }

    return await res.json();
  }

  async getClientInfo() {
    const res = await axios.get(`${MONO_API}/personal/client-info`, {
      headers: { 'X-Token': this.token },
    });
    return res.data;
  }

  async getStatement(account: string, from: number, to: number) {
    const url = `${MONO_API}/personal/statement/${account}/${from}/${to}`;
    const res = await axios.get(url, {
      headers: { 'X-Token': this.token },
    });
    return res.data;
  }

  async statusPayment(invoiceId: string) {
    const res = await axios.get(
      `${MONO_API}/api/merchant/invoice/status?invoiceId=${invoiceId}`,
      { headers: { 'X-Token': this.token } },
    );
    return res.data;
  }
  async setWebhook(webhookUrl: string) {
    const res = await axios.post(
      `${MONO_API}/personal/webhook`,
      { webHookUrl: webhookUrl },
      { headers: { 'X-Token': this.token } },
    );
    return res.data;
  }
}
