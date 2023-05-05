import config from 'config';
import User from '../models/user.model';
import nodemailer from 'nodemailer';
import pug from 'pug';
import { convert } from 'html-to-text';

const smtp = config.get<{
    host: string;
    port: number;
    user: string;
    password: string;
}>('smtp');

export default class Email {
    to: string;
    from : string;

    constructor(public user: User, public url: string){
        this.to = user.email,
        this.from = `RoomEase ${config.get<string>('emailFrom')}`
    }

    private newTransport() {
        return nodemailer.createTransport({
            ...smtp,
            auth: {
                user: smtp.user,
                pass: smtp.password,
            },
        });
    }

    private async send(template: string, subject: string){
        const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
            subject,
            url: this.url
        });

        const mailOptions ={
            from: this.from,
            to: this.to,
            subject,
            text: convert(html),
            html
        }

        const info = await this.newTransport().sendMail(mailOptions);
        console.log(nodemailer.getTestMessageUrl(info));
    }

    async sendVerification() {
        await this.send('verifyCode', 'Your account verification code');
    }
}