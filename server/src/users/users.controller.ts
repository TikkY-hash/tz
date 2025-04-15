import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';

import { PublicUserDto } from './dto/get-user.dto';
import { UsersService } from './providers/users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user info (based on JWT)' })
  @ApiResponse({
    status: 200,
    description: 'Public user info',
    type: PublicUserDto,
  })
  public findOne(@ActiveUser('sub') sub: number) {
    return this.usersService.findOne(sub);
  }
}
