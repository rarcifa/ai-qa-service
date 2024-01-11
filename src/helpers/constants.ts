import dotenv from 'dotenv';
import express, { Router } from 'express';

dotenv.config();

// service config
export const IS_PROD_ENV: boolean = process.env.NODE_ENV === 'production';
export const IS_DEV_ENV: boolean = process.env.NODE_ENV === 'development';
export const DEFAULT_ENV: string = IS_DEV_ENV ? 'development' : 'production';

// db
export const DB_HOST: string = process.env.DB_HOST || '';
export const DB_NAME: string = process.env.DB_NAME || '';
export const DB_USERNAME: string = process.env.DB_USERNAME || '';
export const DB_PASSWORD: string = process.env.DB_PASSWORD || '';
export const DB_PORT: number = Number(process.env.DB_PORT) || 5432;
export const DB_DIALECT: string = process.env.DB_DIALECT || 'postgres';

// urls
export const API_BASE_URL: string = process.env.API_BASE_URL || '';
export const DATA_FOR_SEO_BASE_API: string = process.env.DATA_FOR_SEO_BASE_API || '';
export const BING_SEARCH_V7_ENDPOINT: string = process.env.BING_SEARCH_V7_ENDPOINT || '';

// keys
export const CHATBOT_READ_API_KEY: string = process.env.CHATBOT_READ_API_KEY;
export const CHATBOT_READ_API_SECRET: string = process.env.CHATBOT_READ_API_SECRET;
export const CHATBOT_WRITE_API_KEY: string = process.env.CHATBOT_WRITE_API_KEY;
export const CHATBOT_WRITE_API_SECRET: string = process.env.CHATBOT_WRITE_API_SECRET;
export const DATA_FOR_SEO_USERNAME: string = process.env.DATA_FOR_SEO_USERNAME || '';
export const DATA_FOR_SEO_PASSWORD: string = process.env.DATA_FOR_SEO_PASSWORD || '';
export const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY || '';
export const BING_SEARCH_V7_SUBSCRIPTION_KEY: string = process.env.BING_SEARCH_V7_SUBSCRIPTION_KEY || '';

// router
export const chatbotRouter: Router = express.Router();
export const healthRouter: Router = express.Router();

// misc
export const VECTOR_STORE_PATH: string = 'Documents.index';
