import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().default(4000),
  OPENAI_API_KEY: Joi.string().required(),
  OPENAI_MODEL: Joi.string().default('gpt-4o-mini'),
}); 