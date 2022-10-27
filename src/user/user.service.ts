import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { UserRequest } from '../dtos/user-requst.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  getUser(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  async removeUser(id: number, user: any) {
    if (user.role !== 'admin' || user.id === id) {
      throw new UnauthorizedException();
    }
    return this.usersRepository.delete(id);
  }

  async createUser(request: UserRequest) {
    const numOfUsers = await this.usersRepository.count();

    if (numOfUsers > 9) {
      throw new BadRequestException('User limit reached!');
    }

    const user = await this.usersRepository.findOneBy({
      username: request.username,
    });
    if (user) {
      throw new BadRequestException('User exists already');
    }
    const saltOrRounds = 10;
    const password = request.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const userRole = password === process.env.MASTER_KEY ? 'admin' : 'regular';

    return this.usersRepository.save({
      ...request,
      password: hash,
      role: userRole,
    });
  }
}
