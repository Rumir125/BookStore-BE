import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRequest } from '../interface/request/user-request';
import { User } from '../model/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['books'] });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  getUser(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  async removeUser(id: number, user: any) {
    if (user.role !== 'admin') {
      throw new UnauthorizedException();
    }
    return this.usersRepository.delete(id);
  }

  async createUser(request: UserRequest) {
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
