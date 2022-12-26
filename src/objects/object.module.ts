import { Module } from '@nestjs/common';
import { ObjectController } from './presentation';
import { ObjectService } from './application';
import { FileStorageService, ObjectRepository } from './infrasturcture';

@Module({
  controllers: [ObjectController],
  providers: [ObjectService, ObjectRepository, FileStorageService],
  imports: [],
  exports: [ObjectService],
})
export class ObjectModule {}
