import { Module } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { FindUserByEmailProvider } from './providers/find-user-by-email.provider';
import { CreateUserProvider } from './providers/create-user.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, FindUserByEmailProvider, CreateUserProvider],
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  exports: [UsersService, FindUserByEmailProvider],
})
export class UsersModule {}
