import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePermissionInput {
  @ApiProperty({ type: Boolean, nullable: false })
  @IsBoolean()
  @IsNotEmpty()
  access: boolean;

  @ApiProperty({ type: Number, nullable: false })
  @IsNumber()
  @IsNotEmpty()
  specificUserId: number;
}
