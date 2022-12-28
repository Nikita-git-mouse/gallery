import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserInput {
  @ApiProperty({ type: String, nullable: true })
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  surname?: string;

  @ApiProperty({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  middleName?: string;
}
