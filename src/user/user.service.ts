import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from '../db/db';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const date = Date.now();

    const user = {
      id: randomUUID(),
      version: 1,
      createdAt: date,
      updatedAt: date,
      ...createUserDto,
    };

    users.set(user.id, user);
    console.log('User created');

    delete user.password;
    return user;
  }

  findAll() {
    const usersPublicData = Array.from(users.values()).map(
      (user) => delete user.password,
    );
    return usersPublicData;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
