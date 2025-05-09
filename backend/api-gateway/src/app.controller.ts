import { Controller, Delete, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  @Get('users')
  getUsers() {
    return this.userClient.send({ cmd: 'get_users' }, {});
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: string) {
    return this.userClient.send({ cmd: 'delete_user' }, { id });
  }
}
