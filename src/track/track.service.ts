import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { tracks } from '../db/db';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const track = {
      id: randomUUID(),
      ...createTrackDto,
    };

    tracks.push(track);
    console.log('Track created');

    return track;
  }

  findAll() {
    return tracks;
  }

  findOne(id: string) {
    const current = tracks.find((track) => track.id === id);

    if (current) {
      return current;
    }

    throw new NotFoundException(`Track with id ${id} not found`);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track with this: ${updateTrackDto}`;
  }

  remove(id: string) {
    const index = tracks.findIndex((track) => track.id === id);

    if (index !== -1) {
      tracks.splice(index, 1);
      return true;
    }

    throw new NotFoundException(`Track with id ${id} not found`);
  }
}
