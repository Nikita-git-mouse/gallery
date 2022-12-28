import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import { IsBoolean, IsString } from 'class-validator';

export class AddObjectInput {
  @ApiProperty({ type: Boolean, nullable: false })
  @Transform(({ value }) => {
    return Boolean(value === 'true');
  })
  @IsBoolean()
  access: boolean;

  @ApiProperty({ type: String, nullable: false })
  @IsString()
  fileName: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  object: Express.Multer.File;
}
