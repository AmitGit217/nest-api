import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthInterface {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
