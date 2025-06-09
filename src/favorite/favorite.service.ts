import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoriteService {
  findAll() {
    return `This action returns all favorite`;
  }

  findOne(id: string) {
    return `This action returns a #${id} favorite`;
  }

  remove(id: string) {
    return `This action removes a #${id} favorite`;
  }
}
