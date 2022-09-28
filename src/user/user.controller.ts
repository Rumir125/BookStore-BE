import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRequest } from '../interface/request/user-request';
import { UserResponse } from '../interface/response/user-response';
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
      books: item.books,
      id: item.id,
      username: item.username,
      role: item.role,
    }));
  }

  @Get(':id')
  public async getUserById(@Param('id') userId: number): Promise<UserResponse> {
    return this.userService.findOne(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:userId')
  public async deleteUser(@Param('userId') userId: number, @User() user) {
    await this.userService.removeUser(userId, user);
    return 'User Deleted successfully';
  }
}
