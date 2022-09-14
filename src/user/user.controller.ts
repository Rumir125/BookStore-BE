import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserRequest } from 'src/interface/request/user-request';
import { UserResponse } from 'src/interface/response/user-response';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  public constructor(private userService: UserService) {}

  @Post()
  public async createUser(
    @Body() userRequest: UserRequest,
  ): Promise<UserResponse> {
    return this.userService.createUser(userRequest);
  }

  @Get()
  public async getUsers(): Promise<UserResponse[]> {
    const res = await this.userService.findAll();
    return res.map((item) => ({
      firstName: item.firstName,
      lastName: item.lastName,
    }));
  }

  @Get(':id')
  public async getUserById(@Param('id') userId: number): Promise<UserResponse> {
    return this.userService.findOne(userId);
  }
}
