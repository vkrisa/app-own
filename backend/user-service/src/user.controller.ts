import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User } from '@prisma/client';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'user.get_users' })
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers({});
  }

  @MessagePattern({ cmd: 'user.get_user_by_email' })
  async getUserByEmail(
    @Payload() data: { email: string },
  ): Promise<User | null> {
    const { email } = data;
    return await this.userService.getUserByEmail(email);
  }

  @MessagePattern({ cmd: 'user.delete_user' })
  async deleteUser(@Payload() data: { id: string }) {
    const { id } = data;
    return await this.userService.deleteUser(id);
  }
}
