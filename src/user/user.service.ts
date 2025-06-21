import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from '../db/db';
import { LoggingService } from '../logger/logger.service';

@Injectable()
export class UserService {
  constructor(private readonly logger: LoggingService) {}

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
    this.logger.log('User created successfully.', 'User Service');

    delete user.password;
    return user;
  }

  findAll() {
    const usersPublicData = Array.from(users.values()).map(
      (user) => delete user.password,
    );
    this.logger.log('Found all users successfully.', 'User Service');
    return usersPublicData;
  }

  findOne(id: string) {
    const user = users.get(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.logger.log('User found successfully.', 'User Service');
    delete user.password;
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    // to do
    this.logger.log('User updated successfully.', 'User Service');
    return `This action updates a #${id} user with this: ${updateUserDto}`;
  }

  remove(id: string) {
    if (!users.has(id)) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }

    users.delete(id);
    this.logger.log('User removed successfully.', 'User Service');
    return true;
  }
}
