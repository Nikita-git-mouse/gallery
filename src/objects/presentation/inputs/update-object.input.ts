import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateObjectInput {
  @ApiProperty({ type: Boolean, nullable: true })
  @IsBoolean()
  @IsOptional()
  access?: boolean;

  @ApiProperty({ type: String, nullable: true })
  @IsString()
  @IsOptional()
  name?: string;
}
