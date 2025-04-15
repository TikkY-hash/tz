import * as Joi from 'joi';

export default Joi.object({
  NEST_PORT: Joi.number().default(3000),
  USERNAME: Joi.string().required(),
  PASSWORD: Joi.string().required(),
  HOST: Joi.string().default('localhost'),
  DATABASE: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DATABASE_SYNC: Joi.boolean().default(true),
  DATABASE_AUTOLOAD: Joi.boolean().default(true),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required().default('15m'),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().required().default('7d'),
  GITHUB_API: Joi.string().required(),
  CORS_ORIGIN: Joi.string().required().default('http://localhost:5173'),
});
