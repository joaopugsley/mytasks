import { Injectable, OnModuleInit } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { ActivationEmail } from './templates/activation.html';

@Injectable()
export class EmailService implements OnModuleInit {
  public isAvailable: boolean;

  onModuleInit() {
    this.isAvailable =
      process.env.GMAIL_EMAIL && process.env.GMAIL_PASSWORD !== undefined;
  }

  private async sendMail(to: string, subject: string, body: string) {
    try {
      const transporter = createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
      await transporter.sendMail({
        from: process.env.GMAIl_EMAIL,
        to: to,
        subject: subject,
        html: body,
      });
    } catch (err) {
      throw err;
    }
  }

  async sendActivationEmail(
    to: string,
    nickname: string,
    activation_key: string,
  ) {
    if (!this.isAvailable) {
      throw new Error('Email service not available');
    }
    const template = ActivationEmail(
      nickname,
      `${process.env.WEB_URL}/account/activate/${activation_key}`,
    );
    return await this.sendMail(to, 'Ative sua Conta - MyTasks', template);
  }
}
