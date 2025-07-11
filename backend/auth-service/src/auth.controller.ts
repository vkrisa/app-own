import { Controller, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GoogleUser } from './interfaces/Google';
import { MessagePattern } from '@nestjs/microservices';

interface AuthenticatedRequest extends Request {
  user: GoogleUser;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'google_login' })
  @UseGuards(AuthGuard('google'))
  handleLogin() {
    return { msg: 'Authentication' };
  }

  @MessagePattern({ cmd: 'google_redirect' })
  @UseGuards(AuthGuard('google'))
  handleRedirect(@Req() req: AuthenticatedRequest): GoogleUser {
    const { user } = req;
    return user;
  }
}
