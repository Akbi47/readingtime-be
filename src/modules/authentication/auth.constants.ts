import * as config from 'config';

export const FORGOT_PASSWORD_EXPIRY = parseInt(
  config.get<string>('forgot_password_expiration_time'),
);

export const USER_AUTH_CACHE_PREFIX = 'USER_AUTH_CACHE_PREFIX_';
export const CLIENT_AUTH_CACHE_PREFIX = 'CLIENT_AUTH_CACHE_PREFIX_';
export const SIGN_UP_CACHE = 'SIGN_CACHE_';
export const FORGOT_PASSWORD_CACHE = 'FORGOT_PASSWORD_CACHE_';
