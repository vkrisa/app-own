import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { LoginDto } from './interfaces/Auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'auth.login' })
  handleLogin(@Body() signInDto: LoginDto) {
    return this.authService.signin(signInDto);
  }
}
