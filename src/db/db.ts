import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

export const users: Map<string, User> = new Map();
export const artists: Artist[] = [];
export const albums: Album[] = [];
export const tracks: Track[] = [];
export const favorites: Favorite = {
  artists: [],
  albums: [],
  tracks: [],
};
