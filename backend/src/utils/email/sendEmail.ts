import nodemailer from 'nodemailer';
import { compile } from 'handlebars';
import { readFileSync } from 'fs';
import { join } from 'path';

const sendEmail = async (to: string, subject: string, payload: any, template: string) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const source = readFileSync(join(__dirname, template), 'utf8');
    const compiledTemplate = compile(source);

    const options = () => {
        return {
            from: process.env.FROM_EMAIL,
            to: to,
            subject: subject,
            html: compiledTemplate(payload),
        };
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(options(), (error, info) => {
            if (error) {
                return reject(error);
            }
            return resolve(info);
        });
    });
};

export default sendEmail;
