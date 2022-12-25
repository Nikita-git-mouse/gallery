import { Module } from '@nestjs/common';
import { ObjectController } from './presentation';
import { ObjectService } from './application';
import { ObjectRepository } from './infrasturcture';

@Module({
  controllers: [ObjectController],
  providers: [ObjectService, ObjectRepository],
  imports: [],
  exports: [ObjectService]
})
export class ObjectModule {}
