import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInterface } from 'src/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() user: AuthInterface) {
    console.log({ user });
    return this.authService.signup();
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
