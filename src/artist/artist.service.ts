import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { artists } from 'src/db/db';
import { LoggingService } from '../logger/logger.service';

@Injectable()
export class ArtistService {
  constructor(private logger: LoggingService) {
    this.logger.setContext('Artist Service');
  }

  create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: randomUUID(),
      ...createArtistDto,
    };

    artists.push(artist);
    this.logger.log('Artist created successfully.');

    return artist;
  }

  findAll() {
    this.logger.log('Found all artists successfully.');
    return artists;
  }

  findOne(id: string) {
    const current = artists.find((artist) => artist.id === id);

    if (current) {
      this.logger.log('Artist found successfully.');
      return current;
    }

    throw new NotFoundException(`Artist with id ${id} not found`);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    // to do
    this.logger.log('Artist updated successfully.');
    return `This action updates a #${id} artist with this: ${updateArtistDto}`;
  }

  remove(id: string) {
    const index = artists.findIndex((artist) => artist.id === id);

    if (index !== -1) {
      artists.splice(index, 1);
      this.logger.log('Artist removed successfully.');
      return true;
    }

    throw new NotFoundException(`Artist with id ${id} not found`);
  }
}
