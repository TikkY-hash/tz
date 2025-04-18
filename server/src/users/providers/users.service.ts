import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { PublicUserDto } from '../dto/get-user.dto';
import { User } from '../entities/user.entity';
import { CreateUserProvider } from './create-user.provider';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly createUserProvider: CreateUserProvider,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    return await this.createUserProvider.create(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  public async findOneWithPassword(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  public async findOne(id: number): Promise<PublicUserDto> {
    const user = await this.userRepository.findOneBy({ id });

    return plainToInstance(PublicUserDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
