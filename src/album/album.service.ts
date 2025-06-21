import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { albums } from '../db/db';
import { LoggingService } from '../logger/logger.service';

@Injectable()
export class AlbumService {
  constructor(private logger: LoggingService) {
    this.logger.setContext('Album Service');
  }

  create(createAlbumDto: CreateAlbumDto) {
    const album = {
      id: randomUUID(),
      ...createAlbumDto,
    };

    albums.push(album);
    this.logger.log('Album created successfully.');

    return album;
  }

  findAll() {
    this.logger.log('Found all albums successfully.');
    return albums;
  }

  findOne(id: string) {
    const current = albums.find((album) => album.id === id);

    if (current) {
      this.logger.log('Album found successfully.');
      return current;
    }

    throw new NotFoundException(`Album with id ${id} not found`);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    // to do
    this.logger.log('Album updated successfully.');
    return `This action updates a #${id} album with this: ${updateAlbumDto}`;
  }

  remove(id: string) {
    const index = albums.findIndex((album) => album.id === id);

    if (index !== -1) {
      albums.splice(index, 1);
      this.logger.log('Album removed successfully.');
      return true;
    }

    throw new NotFoundException(`Album with id ${id} not found`);
  }
}
