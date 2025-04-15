import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptProvider } from 'src/auth/providers/bcrypt.provider';
import { GenerateTokenProvider } from 'src/auth/providers/generate-token.provider';
import { Repository } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { FindUserByEmailProvider } from './find-user-by-email.provider';

export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly bcryptProvider: BcryptProvider,

    private readonly findUserByEmailProvider: FindUserByEmailProvider,

    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const existingUser = await this.findUserByEmailProvider.findUserByEmail(createUserDto.email);

      if (existingUser) {
        throw new ConflictException('Email is already in use');
      }

      const newUser = this.userRepository.create({
        ...createUserDto,
        password: await this.bcryptProvider.hashPassword(createUserDto.password),
      });

      await this.userRepository.save(newUser);

      return await this.generateTokenProvider.generateTokens(newUser);
    } catch (error) {
      if (error instanceof ConflictException) throw error;

      throw new InternalServerErrorException('An error occurred while creating the user');
    }
  }
}
