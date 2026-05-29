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
const puppeteer_1 = __importDefault(require("puppeteer"));
const chromium_1 = __importDefault(require("@sparticuz/chromium"));
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
// ====
const helper_1 = require("./helper");
//
const generatePdf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isLocal = process.env.NODE_ENV === 'development';
        const browser = isLocal
            ? yield puppeteer_1.default.launch()
            : yield puppeteer_core_1.default.launch({
                args: chromium_1.default.args,
                executablePath: yield chromium_1.default.executablePath(),
                headless: true,
            });
        const page = yield browser.newPage();
        const testResults = req.body;
        const html = (0, helper_1.generateHtml)(testResults);
        yield page.setContent(html, { waitUntil: 'domcontentloaded' });
        const pdf = yield page.pdf({
            format: 'A4',
            printBackground: true,
        });
        yield browser.close();
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=report.pdf',
        });
        res.end(pdf);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Internal server Error' });
    }
});
exports.default = generatePdf;
