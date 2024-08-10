import * as config from 'config';

export const redisConfig = {
  host: config.get<string>('redis.host'),
  port: +config.get<number>('redis.port'),
  // password: config.get<string>('redis.password'),
  // username: config.get<string>('redis.username'),
  // host: process.env.REDIS_HOST,
  // port: +process.env.REDIS_PORT,
  // password: process.env.REDIS_PASSWORD,
  // username: process.env.REDIS_USERNAME,
};
