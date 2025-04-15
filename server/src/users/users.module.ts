import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { User } from './entities/user.entity';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindUserByEmailProvider } from './providers/find-user-by-email.provider';
import { UsersService } from './providers/users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, FindUserByEmailProvider, CreateUserProvider],
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
  exports: [UsersService, FindUserByEmailProvider],
})
export class UsersModule {}
