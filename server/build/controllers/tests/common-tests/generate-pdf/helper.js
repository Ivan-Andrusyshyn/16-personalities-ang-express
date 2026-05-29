"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHtml = generateHtml;
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
        padding: 20px;
        border-radius:12px;
        background: #003d45; 
        color: #f5f5f5;
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
         align-items: center;
        }

      .logo {
  width: 117px;
  height: 32px;
  font-size: 16px;
  letter-spacing: 6px;
  font-weight: 700;
  padding: 16.5px 5.67px 17.5px 5.66px;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 12px;
  border-top: 4px solid #f5f5f5;
  border-bottom: 4px solid #f5f5f5;
  color: #f5f5f5;
  font-family: "Times New Roman";
  font-style: italic;
  line-height: normal;
}


      h1 {
        font-size: 32px;
        margin: 0;
        color: #f5f5f5;
      }

      .subtitle {
        font-size: 18px;
        color: #f5f5f5;
        margin-top: 8px;
        max-width:80%;
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
      <div>
      <h1>${data.title}</h1>
      <div class="subtitle">${data.subtitle}</div>
      </div>
      <div class="logo">vidchuttia</div>
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

      <div class="footer">
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
      </div>

    </div>

  </body>
  </html>
  `;
}
