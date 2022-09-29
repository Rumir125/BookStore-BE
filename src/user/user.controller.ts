import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserResponse } from '../interface/response/user-response';
import { UserService } from './user.service';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { UserDto } from '../dtos/user.dto';
import { UserRequest } from '../dtos/user-requst.dto';

@Controller('user')
@UseInterceptors(new SerializeInterceptor(UserDto))
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
    return this.userService.findAll();
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
