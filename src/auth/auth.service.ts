import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRequest } from 'src/interface/request/user-request';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<any> {
    const user = await this.usersService.getUser(firstName, lastName);
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
  async login(userRequest: UserRequest) {
    const user = await this.validateUser(
      userRequest.firstName,
      userRequest.lastName,
      userRequest.password,
    );
    const payload = {
      firstName: userRequest.firstName,
      lastName: userRequest.lastName,
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
