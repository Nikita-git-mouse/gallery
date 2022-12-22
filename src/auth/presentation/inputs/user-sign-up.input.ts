import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserSignUpInput {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  middleName: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @Length(5, 10)
  password: string;
}
