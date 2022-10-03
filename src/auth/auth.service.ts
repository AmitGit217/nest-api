import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signup() {
    return 'Sign up';
  }
  login() {
    return 'Log in';
  }
}
