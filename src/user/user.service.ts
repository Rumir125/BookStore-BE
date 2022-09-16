import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRequest } from 'src/interface/request/user-request';
import { User } from 'src/model/user.entity';
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

  getUser(firstName, lastName): Promise<User> {
    return this.usersRepository.findOneBy({ firstName, lastName });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createUser(request: UserRequest) {
    const saltOrRounds = 10;
    const password = request.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return this.usersRepository.save({ ...request, password: hash });
  }

  async checkPassword(userRequest: UserRequest) {
    const user = await this.usersRepository.findOneBy({
      firstName: userRequest.firstName,
      lastName: userRequest.lastName,
    });

    if (!user) {
      return "User doesn't exist";
    }
    const isMatch = await bcrypt.compare(userRequest.password, user.password);

    if (isMatch) {
      return 'You are logged in successfully';
    } else {
      return 'Authentication Failed';
    }
  }
}
