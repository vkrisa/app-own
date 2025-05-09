import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User } from '@prisma/client';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get_users' })
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers({});
  }

  @MessagePattern({ cmd: 'delete_user' })
  async deleteUser(@Payload() data: { id: string }) {
    return await this.userService.deleteUser(data.id);
  }
}
