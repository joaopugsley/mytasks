import { Injectable, OnModuleInit } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class EmailService implements OnModuleInit {
  public isAvailable: boolean;

  onModuleInit() {
    this.isAvailable =
      process.env.GMAIL_EMAIL && process.env.GMAIL_PASSWORD !== undefined;
  }

  async sendMail(to: string, subject: string, body: string) {
    if (!this.isAvailable) {
      throw new Error('Email service not available');
    }
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
  }
}
