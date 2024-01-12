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

// keys
export const QA_READ_API_KEY: string = process.env.QA_READ_API_KEY;
export const QA_READ_API_SECRET: string = process.env.QA_READ_API_SECRET;
export const QA_WRITE_API_KEY: string = process.env.QA_WRITE_API_KEY;
export const QA_WRITE_API_SECRET: string = process.env.QA_WRITE_API_SECRET;
export const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY || '';

// router
export const qaRouter: Router = express.Router();
export const healthRouter: Router = express.Router();

// misc
export const VECTOR_STORE_PATH: string = 'Documents.index';
