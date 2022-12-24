import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

interface AuthMail {
  name: string;
  surname: string;
  email: string;
  redirectUri: string;
}

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendAuthMail(params: AuthMail) {
    const { email, name, surname, redirectUri } = params;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Gallery Cloud',
      template: './auth-message', // `.hbs` extension is appended automatically
      context: {
        redirectUri,
        name,
        surname,
      },
    });
  }
}
