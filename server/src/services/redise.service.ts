import { createClient, RedisClientType } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

class RedisService {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL,
      socket: {
        reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
      },
    });

    this.client.on('connect', () => {
      console.log('✅ Redis connected');
    });

    this.client.on('error', (err) => {
      console.error('❌ Redis error:', err);
    });
  }

  async connect(): Promise<void> {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  async disconnect(): Promise<void> {
    if (this.client.isOpen) {
      await this.client.quit();
    }
  }

  async set(key: string, value: unknown, ttl?: number): Promise<void> {
    const stringValue =
      typeof value === 'string' ? value : JSON.stringify(value);

    if (ttl) {
      await this.client.set(key, stringValue, {
        EX: ttl,
      });
    } else {
      await this.client.set(key, stringValue);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) return null;

    try {
      return JSON.parse(data) as T;
    } catch {
      return data as unknown as T;
    }
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(key);
    return result === 1;
  }

  async flush(): Promise<void> {
    await this.client.flushAll();
  }
}

export const redisService = new RedisService();
