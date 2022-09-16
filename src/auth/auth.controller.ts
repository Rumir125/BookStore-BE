import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRequest } from 'src/interface/request/user-request';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() userRequest: UserRequest) {
    return this.authService.login(userRequest);
  }
}
