import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import path from 'path';

export class CreateObjectInput {
  @ApiProperty({ example: '', description: 'Файл для помещения в галерею' })
  @IsNotEmpty()
  readonly file: any;

  @ApiProperty({ example: 'video/photo', description: 'Тип файла' })
  @IsString()
  @IsNotEmpty()
  readonly type: string;
  
}
