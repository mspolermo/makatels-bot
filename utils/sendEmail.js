import nodemailer from 'nodemailer';
import {
    senderEmail,
    senderPassword,
    recipientEmail
} from '../config/config.js';
import { getMixedString } from './getMixedString.js';

const askDictionary = {
    mirror: {
        subject: 'Хочу зеркало',
        text: 'Где зеркало, Лебовски'
    },
    ticket: {
        subject: 'Не получаю ответ',
        text: 'Добрый день! Отправляю запрос на почту support@kinoland.club, но не получаю ссылку на зеркало('
    }
}

// Функция отправки письма
export async function sendEmail(type) {
    let subject = '';
    let text = '';
    if (type == 'mirror') {
        subject = getMixedString (askDictionary.mirror.subject);
        text = getMixedString (askDictionary.mirror.subject);
    } else if (type == 'ticket') {
        subject = getMixedString (askDictionary.ticket.subject);
        text = getMixedString (askDictionary.ticket.subject);
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        auth: {
            user: senderEmail,
            pass: senderPassword
        }
    });

    const mailOptions = {
        from: senderEmail,
        to: recipientEmail,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Ошибка отправки письма:', error);
        } else {
            console.log('Письмо успешно отправлено:', info.response);
        }
    });

};