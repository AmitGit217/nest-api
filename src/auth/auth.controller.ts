import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInterface } from '../interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() user: AuthInterface) {
    return this.authService.signup(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() user: AuthInterface) {
    return this.authService.login(user);
  }
}
