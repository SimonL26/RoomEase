import config from 'config';
import User from '../models/user.model';
import nodemailer from 'nodemailer';

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
        this.from = `Simone ${config.get<string>('emailFrom')}`
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
        return;
    }
}