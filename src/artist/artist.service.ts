import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { artists } from 'src/db/db';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: randomUUID(),
      ...createArtistDto,
    };

    artists.push(artist);
    console.log('Artist created');

    return artist;
  }

  findAll() {
    return artists;
  }

  findOne(id: string) {
    const current = artists.find((artist) => artist.id === id);

    if (current) {
      return current;
    }

    throw new NotFoundException(`Artist with id ${id} not found`);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist with this: ${updateArtistDto}`;
  }

  remove(id: string) {
    const index = artists.findIndex((artist) => artist.id === id);

    if (index !== -1) {
      artists.splice(index, 1);
      return true;
    }

    throw new NotFoundException(`Artist with id ${id} not found`);
  }
}
