import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginRequest } from '../interface/request/login-request';

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
    let user;
    user = await this.validateUser(
      loginRequest.username,
      loginRequest.password,
    );

    if (!user) {
      throw new NotFoundException('Username or password is not correct');
    }
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      id: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
