import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeletePermissionInput {
  @ApiProperty({ type: Number, nullable: false })
  @IsNumber()
  @IsNotEmpty()
  specificUserId: number;
}
