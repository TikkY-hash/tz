import { Controller, Get } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PublicUserDto } from './dto/get-user.dto';

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
