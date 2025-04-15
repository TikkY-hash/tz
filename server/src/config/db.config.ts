import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.USERNAME ?? 'postgres',
  password: process.env.PASSWORD ?? '123',
  name: process.env.DATABASE ?? 'nest-js',
  synchronize: process.env.DATABASE_SYNC === 'true',
  autoLoadEntities: process.env.DATABASE_AUTOLOAD === 'true',
}));
