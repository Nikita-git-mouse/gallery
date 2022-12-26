import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import {
  Contains,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class AddObjectInput {
  @ApiProperty({ type: Boolean, nullable: false })
  @Transform(({ value }) => {
    return Boolean(value === 'true');
  })
  @IsBoolean()
  access: boolean;

  @ApiProperty({ type: [Number], nullable: false })
  @Transform(({ value }) => value.split(',').map((num) => Number(num)))
  @IsNumber({}, { each: true })
  baned: Array<number>;

  @ApiProperty({ type: [Number], nullable: false })
  @Transform(({ value }) => value.split(',').map((num) => Number(num)))
  @IsNumber({}, { each: true })
  accessed: Array<number>;

  @ApiProperty({ type: String, nullable: false })
  @IsString()
  fileName: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  object: Express.Multer.File;
}
