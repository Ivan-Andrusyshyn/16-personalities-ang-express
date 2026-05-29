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
function generateHtml(data) {
    return `
  <html>
  <head>
    <meta charset="UTF-8" />

    <style>
      @page {
    margin: 24px;
  }

      body {
        font-family: Arial, Helvetica, sans-serif;
        background: #f8fafc;
        margin: 0;
        padding: 40px;
        color: #1f2937;
        line-height: 1.6;
      }

      .container {
        max-width: 800px;
        margin: 0 auto;
        background: white;
        padding: 40px;
        border-radius: 10px;
        box-shadow: 0 0 0 1px #e5e7eb;
      }

      .header {
        border-bottom: 2px solid #0f766e;
        padding-bottom: 15px;
        margin-bottom: 30px;
      }

      h1 {
        font-size: 32px;
        margin: 0;
        color: #0f766e;
      }

      .subtitle {
        font-size: 18px;
        color: #475569;
        margin-top: 8px;
      }
        .social {
  margin-top: 30px;
  text-align: center;
}

.social-title {
  font-size: 14px;
  margin-bottom: 10px;
  color: #334155;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.social-links a {
  text-decoration: none;
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 6px;
  background: #0f766e;
  color: white;
  transition: background 0.2s ease;
}

.social-links a:hover {
  background: #115e59;
}
.section {
  margin-top: 30px;
  padding: 20px;
  border-left: 4px solid #0f766e;
  background: #f9fafb;
  border-radius: 6px;

  page-break-inside: avoid;
  break-inside: avoid;
}

      h2 {
        margin-top: 0;
        margin-bottom: 10px;
        font-size: 22px;
        color: #0f172a;
        page-break-after: avoid;

      }

      p {
        margin-top: 0;
        page-break-inside: avoid;ы
        margin-bottom: 12px;
      }

      ul {
        margin: 0;
        padding-left: 20px;
      }

      li {
        margin-bottom: 6px;
      }

      .footer {
        margin-top: 40px;
        font-size: 12px;
        text-align: center;
        color: #64748b;
        border-top: 1px solid #e5e7eb;
        padding-top: 10px;
      }
    </style>

  </head>

  <body>

    <div class="container">

      <div class="header">
        <h1>${data.title}</h1>
        <div class="subtitle">${data.subtitle}</div>
      </div>

      ${data.sections
        .map((section) => `
        <div class="section">

          <h2>${section.title}</h2>

          <p>${section.sectionsDescription}</p>

          <ul>
            ${section.sectionsList.map((item) => `<li>${item}</li>`).join('')}
          </ul>

        </div>
      `)
        .join('')}
<div class="social">

  <div class="social-title">
    Підписуйся 
  </div>

  <div class="social-links">

    <a href="https://www.tiktok.com/@alex_white_light" target="_blank">
      TikTok
    </a>

    <a href="https://www.instagram.com/oleksandr_andrusyshyn" target="_blank">
      Instagram
    </a>

    <a href="https://t.me/alex_andrusishin" target="_blank">
      Telegram
    </a>

  </div>

</div>
      <div class="footer">
        Generated report
      </div>

    </div>

  </body>
  </html>
  `;
}
const generatePdf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const browser = yield puppeteer_1.default.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = yield browser.newPage();
        const testResults = req.body;
        const html = generateHtml(testResults);
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
