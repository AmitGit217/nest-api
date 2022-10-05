import { UserService } from './user.service';
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { EditUserInterface } from '../interfaces/editUser.interface';
import { GetUser } from '../auth/decorator/getUser.decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser() user: User, @Body() dto: EditUserInterface) {
    return this.userService.editUser(user.id, dto);
  }
}
