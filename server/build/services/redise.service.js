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
exports.redisService = void 0;
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class RedisService {
    constructor() {
        this.client = (0, redis_1.createClient)({
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
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client.isOpen) {
                yield this.client.connect();
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client.isOpen) {
                yield this.client.quit();
            }
        });
    }
    set(key, value, ttl) {
        return __awaiter(this, void 0, void 0, function* () {
            const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
            if (ttl) {
                yield this.client.set(key, stringValue, {
                    EX: ttl,
                });
            }
            else {
                yield this.client.set(key, stringValue);
            }
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.client.get(key);
            if (!data)
                return null;
            try {
                return JSON.parse(data);
            }
            catch (_a) {
                return data;
            }
        });
    }
    del(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.del(key);
        });
    }
    exists(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.client.exists(key);
            return result === 1;
        });
    }
    flush() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.flushAll();
        });
    }
}
exports.redisService = new RedisService();
