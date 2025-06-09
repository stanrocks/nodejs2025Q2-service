import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { albums } from '../db/db';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const album = {
      id: randomUUID(),
      ...createAlbumDto,
    };

    albums.push(album);
    console.log('Album created');

    return album;
  }

  findAll() {
    return albums;
  }

  findOne(id: string) {
    const current = albums.find((album) => album.id === id);

    if (current) {
      return current;
    }

    throw new NotFoundException(`Album with id ${id} not found`);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: string) {
    const index = albums.findIndex((album) => album.id === id);

    if (index !== -1) {
      albums.splice(index, 1);
      return true;
    }

    throw new NotFoundException(`Album with id ${id} not found`);
  }
}
