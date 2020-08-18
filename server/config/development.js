import 'dotenv/config';

export default {
  DATABASE_URL: process.env.BOOKSTORE_DEV_DATABASE_URL,
  JWT_SECRET: process.env.SECRET
};
