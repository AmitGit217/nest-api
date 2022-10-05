import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookmarkInterface {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsString()
  @IsNotEmpty()
  link: string;
}
