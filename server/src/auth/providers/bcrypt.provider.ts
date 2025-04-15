import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider {
  async hashPassword(data: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return bcrypt.hash(data, salt);
  }
  async comparePassword(password: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(password, encrypted);
  }
}
