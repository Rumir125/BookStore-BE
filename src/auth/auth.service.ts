import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRequest } from 'src/interface/request/user-request';
import { LoginRequest } from 'src/interface/request/login-request';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(username);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }
  async login(loginRequest: LoginRequest) {
    const user = await this.validateUser(
      loginRequest.username,
      loginRequest.password,
    );
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      id: user.id,
    };

    if (!user) {
      return 'Authentication failed';
    }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
