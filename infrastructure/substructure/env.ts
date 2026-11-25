import dotenv from 'dotenv';
import { z } from 'zod';
import { zodValidateSync } from '#substructure/utils/zodValidator.ts';
import path from "path";

dotenv.config();

const dir: string = process.cwd();

const env: string = process.env.NODE_ENV || 'development';

const envFilePath: string = path.resolve(dir, `.env.${env}`);

dotenv.config({ path: envFilePath });

const envSchema = z.object({
	SERVER_URL: z.string().min(2),
	PRIVATE_ENCRYPTING_KEY: z.string().min(1),
	PORT: z.coerce.number().default(7005),
	TOKEN_EXPIRATION_TIME: z.coerce.number().default(86400), // 1 day
	COOKIE_DOMAIN: z.string().min(1),
	NODE_ENV: z.enum(['production', 'development', 'stage']).default('development'),
	REDIS_PATH: z.string().min(1).default('redis://127.0.0.1:6379'),
	TOOL_ACCESS_TOKEN: z.string().min(1),
	DEFAULT_PASSWORD: z.string().min(1),
	TOKEN_DECRYPTING_KEY: z.string().min(1),
	TOKEN_ENCRYPTING_KEY: z.string().min(1),
	CORS_LOCAL_FRONTEND: z.string().min(1),
	CORS_DEV_FRONTEND: z.string().min(1),
	PRODUCT_DELIVERY_DAYS: z.coerce.number(),
	MOCK_PORT: z.string().min(1),
  MOCK_PATH: z.string().min(1),
	API_DOC_BASE_PATH: z.string().default('http://localhost:3001'),
	BULLMQ_USERNAME: z.string(),
	BULLMQ_PASSWORD: z.string(),
  S3_ENDPOINT: z.string(),
  S3_PORT: z.string(),
  S3_USE_SSL: z.string(),
  S3_ACCESS_KEY: z.string(),
  S3_SECRET_KEY: z.string(),
  S3_DEFAULT_BUCKET: z.string(),
  S3_PUBLIC_END_POINT: z.string(),
  S3_PUBLIC_PORT: z.string(),
  S3_PUBLIC_USE_SSL: z.string(),
});

const value: any = zodValidateSync(process.env, envSchema, {}, 'Env Validation: ');

export default {
	serverURL: process.env.SERVER_URL,
	privateEncryptingKey: value.PRIVATE_ENCRYPTING_KEY,
	port: value.PORT,
	tokenExpirationTime: value.TOKEN_EXPIRATION_TIME,
	environment : value.NODE_ENV,
	cookieDomain: value.COOKIE_DOMAIN,
	redisPath: value.REDIS_PATH,
	toolAccessToken: value.TOOL_ACCESS_TOKEN,
	defaultPassword: value.DEFAULT_PASSWORD,
	tokenDecryptingKey: value.TOKEN_DECRYPTING_KEY,
	tokenEncryptingKey: value.TOKEN_ENCRYPTING_KEY,
	corsLocalFrontend: value.CORS_LOCAL_FRONTEND,
	corsDevFrontend: value.CORS_DEV_FRONTEND,
	productDeliveryDays: value.PRODUCT_DELIVERY_DAYS,
	mockPort: value.MOCK_PORT,
  mockPath: value.MOCK_PATH,
	apiDocBasePath:  value.API_DOC_BASE_PATH,
	bullMQUsername: value.BULLMQ_USERNAME,
	bullMQPassword: value.BULLMQ_PASSWORD,
  s3Endpoint: value.S3_ENDPOINT,
  s3Port: value.S3_PORT,
  s3AccessKey: value.S3_ACCESS_KEY,
  s3SecretKey: value.S3_SECRET_KEY,
  s3UseSSL: value.S3_USE_SSL ? value.S3_USE_SSL === "true" : false,
  s3DefaultBucket: value.S3_DEFAULT_BUCKET,
  s3PublicEndPoint: value.S3_PUBLIC_END_POINT,
  s3PublicPort: Number(value.S3_PUBLIC_PORT),
  s3PublicUseSSL: value.S3_PUBLIC_USE_SSL ? value.S3_PUBLIC_USE_SSL === "true" : false,
};
