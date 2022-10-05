import { IsOptional, IsString } from 'class-validator';

export class EditBookmarkInterface {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsString()
  @IsOptional()
  link?: string;
}
