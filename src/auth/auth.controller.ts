import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from 'src/interface/request/login-request';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginRequest: LoginRequest) {
    return this.authService.login(loginRequest);
  }
}
