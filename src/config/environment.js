import dotenv from "dotenv";
dotenv.config();

export const ENVIRONMENT = {
  API_KEY: process.env.API_KEY,
  GMAIL: process.env.GMAIL,
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
  DB_URL: process.env.DB_URL,
  DB_NAME: process.env.DB_NAME,
  PORT: process.env.PORT,
  GMAIL_USERNAME: process.env.GMAIL_USERNAME,
  GMAIL_APP_PASS: process.env.GMAIL_APP_PASS,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  FRONTEND_URL: process.env.FRONTEND_URL,
  BACKEND_URL: process.env.BACKEND_URL,


  MONGO_DB_ATLAS_PASSWORD: process.env.MONGO_DB_ATLAS_PASSWORD,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
console.log("Variables cargadas:", process.env.DB_URL, process.env.DB_NAME);
