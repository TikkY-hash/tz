import { registerAs } from '@nestjs/config';

export default registerAs('github', () => ({
  github: process.env.GITHUB_API,
}));
