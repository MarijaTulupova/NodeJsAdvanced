import { Movie } from '../entities/movie.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedMoviesDto {
  @ApiProperty({ type: [Movie] })
  payload: Movie[];

  @ApiProperty({ example: 42 })
  total: number;
}
