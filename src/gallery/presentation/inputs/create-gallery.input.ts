import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateGalleryInput {
  @ApiProperty({ example: 'user@mail.com', description: 'Email' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
