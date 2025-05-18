import { IsOptional, IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum Genre {
  ACTION = 'action',
  COMEDY = 'comedy',
  DRAMA = 'drama',
  HORROR = 'horror',
  SCI_FI = 'sci_fi',
  ROMANCE = 'romance',
  DOCUMENTARY = 'documentary',
  ANIMATION = 'animation',
  THRILLER = 'thriller',
  FANTASY = 'fantasy',
}

export class FilterMoviesDto {
  @ApiPropertyOptional({ enum: Genre })
  @IsOptional()
  @IsEnum(Genre)
  genre?: Genre;

  @ApiPropertyOptional({ description: 'Minimum rating (1-10)', example: 7 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minRating?: number;

  @ApiPropertyOptional({
    description: 'Maximum duration in minutes',
    example: 120,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxDuration?: number;

  @ApiPropertyOptional({ description: 'Search by title', example: 'Inception' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    enum: ['releaseYear', 'rating', 'duration'],
    default: 'releaseYear',
  })
  @IsOptional()
  @IsEnum(['releaseYear', 'rating', 'duration'])
  sortBy?: 'releaseYear' | 'rating' | 'duration';

  @ApiPropertyOptional({ enum: ['ASC', 'DESC'], default: 'DESC' })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}
