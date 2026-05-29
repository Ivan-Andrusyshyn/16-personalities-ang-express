import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();

class NodemailerService {
  transporter: any;

  constructor() {
    this.createTransport();
  }

  createTransport() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_EMAIL_PASSWORD,
      },
    });
  }

  async sendMail(mailOptions: any): Promise<any> {
    try {
      return await this.transporter.sendMail({
        ...mailOptions,
      });
    } catch (error) {
      return error;
    }
  }
}

const nodemailerService = new NodemailerService();

export default nodemailerService;
