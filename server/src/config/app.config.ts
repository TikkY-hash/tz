import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  NEST_PORT: process.env.NODE_ENV || 'production',
}));
