import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { tracks } from '../db/db';
import { LoggingService } from '../logger/logger.service';

@Injectable()
export class TrackService {
  constructor(private readonly logger: LoggingService) {}

  create(createTrackDto: CreateTrackDto) {
    const track = {
      id: randomUUID(),
      ...createTrackDto,
    };

    tracks.push(track);
    this.logger.log('Track created successfully.', 'Track Service');

    return track;
  }

  findAll() {
    this.logger.log('Found all tracks successfully.', 'Track Service');
    return tracks;
  }

  findOne(id: string) {
    const current = tracks.find((track) => track.id === id);

    if (current) {
      this.logger.log('Track found successfully.', 'Track Service');
      return current;
    }

    throw new NotFoundException(`Track with id ${id} not found`);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    // to do
    this.logger.log('Track updated successfully.', 'Track Service');
    return `This action updates a #${id} track with this: ${updateTrackDto}`;
  }

  remove(id: string) {
    const index = tracks.findIndex((track) => track.id === id);

    if (index !== -1) {
      tracks.splice(index, 1);
      this.logger.log('Track removed successfully.', 'Track Service');
      return true;
    }

    throw new NotFoundException(`Track with id ${id} not found`);
  }
}
