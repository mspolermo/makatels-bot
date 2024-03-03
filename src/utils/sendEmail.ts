import nodemailer from 'nodemailer';
import { emailType, moviesMirrorType } from '../types/types';
import {
    senderEmail,
    senderPassword,
    kinolandEmail,
    kinolandSupportMail,
    hdrezkaEmail,
    hdrezkaSupportMail,
    creatorEmail
} from '../config/config';

const askDictionary = {
    mirror: {
        subject: 'Хочу получить ссылку на зеркало',
        text: 'Где зеркало, Лебовски'
    },
    ticket: {
        subject: 'Не получаю ответ на запрос ссылки',
        text: 'Добрый день! Отправляю запрос, но не получаю ссылку на зеркало( Может быть я попал в черный список?'
    },
    error: {
        subject: 'Бот не робит',
        text: 'Бот норм не извлекает ссылку, надо чекнуть'
    },
    feedback: 'Отзыв о работе бота МАКАТЕЛИ'
}

// Функция отправки письма
export async function sendEmail(type: emailType, mirrorType?: moviesMirrorType, textBody?: string) {
    let subject = '';
    let text = (textBody) ? textBody : '';
    let recipientEmail = '';

    switch(type) {
        case 'ticket' :
            subject = askDictionary.ticket.subject;
            text = askDictionary.ticket.text;
            if (mirrorType === 'kinoland') {
                recipientEmail = kinolandSupportMail;
            }
            if (mirrorType === 'hdrezka') {
                recipientEmail = hdrezkaSupportMail;
            }
            break;
        case 'mirror':
            subject = askDictionary.mirror.subject;
            text = askDictionary.mirror.text;
            if (mirrorType === 'kinoland') {
                recipientEmail = kinolandEmail;
            }
            if (mirrorType === 'hdrezka') {
                recipientEmail = hdrezkaEmail;
            }
            break;
        case 'error': 
            subject = askDictionary.error.subject;
            text = askDictionary.error.text;
            recipientEmail = creatorEmail;
            break;
        case 'feedback': 
            subject = askDictionary.feedback
            recipientEmail = creatorEmail;
            break;
        default:
            break;
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

}
