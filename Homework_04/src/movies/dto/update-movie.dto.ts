import { PartialType } from '@nestjs/swagger';
import { CreateMovieDto } from './create-movie.dto';
import { Type } from 'class-transformer';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @Type(() => Number)
  releaseYear?: number;

  @Type(() => Number)
  duration?: number;

  @Type(() => Number)
  rating?: number;
}
