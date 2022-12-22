import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from '../application';

@ApiTags('Контроллер пользователей')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
}
