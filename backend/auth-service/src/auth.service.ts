import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './interfaces/Auth';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}
  signin(signInDto: LoginDto) {
    const user = this.userClient.send(
      { cmd: 'user.get_user_by_email' },
      { data: { email: signInDto.username } },
    );
    return user;
  }
}
