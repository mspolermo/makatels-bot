import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../config.env') });

export const telegramToken = process.env.TELEGRAM_TOKEN || '';
export const senderEmail = process.env.SENDER_EMAIL || '';
export const senderPassword = process.env.SENDER_PASSWORD || '';

export const creatorEmail = process.env.CREATOR_EMAIL || '';
export const kinolandEmail = process.env.KINOLAND_EMAIL || '';
export const kinolandSupportMail = process.env.KINOLAND_SUPPORT_MAIL || '';

export const hdrezkaEmail = process.env.HDREZKA_EMAIL || '';
export const hdrezkaSupportMail = process.env.HDREZKA_SUPPORT_MAIL || '';

export const frontendLink = process.env.FRONTEND_LINK || '';


// Auth data
//export const telegramToken = '6427348844:AAFvXe04ZvHY4TQYr258C6-eM9tIjjj2jpc';

// export const senderEmail = 'alexander.medvedev02@yandex.ru';
// export const senderPassword = 'mrkymkuujxeziczh';

// export const creatorEmail = 'mspolermo@gmail.com';
// export const kinolandEmail = 'mirror@kinoland.club';
// export const kinolandSupportMail = 'support@kinoland.club';

// export const hdrezkaEmail = 'mirror@hdrezka.org';
// export const hdrezkaSupportMail = 'support@hdrezka.org';

// export const frontendLink = 'https://makatels.netlify.app';
