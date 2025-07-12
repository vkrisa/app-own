import { Controller, Delete, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Get('signin')
  signIn() {
    return this.authClient.send({ cmd: 'auth.login' }, {});
  }

  @Get('users')
  getUsers() {
    return this.userClient.send({ cmd: 'user.get_users' }, {});
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: string) {
    return this.userClient.send({ cmd: 'user.delete_user' }, { id });
  }
}
