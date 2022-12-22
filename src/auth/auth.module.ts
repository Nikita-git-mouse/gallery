import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './presentation';
import { AuthService } from './application';
import { AuthRepository } from './infrasturcture';
import { UsersModule } from '../users';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  imports: [UsersModule, JwtModule],
})
export class AuthModule {}
