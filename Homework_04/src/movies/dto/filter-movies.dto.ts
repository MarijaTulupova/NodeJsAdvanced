import { IsOptional, IsEnum, IsNumber, IsString, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Genre } from '../enums/genre.enum';

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

  @ApiPropertyOptional({ description: 'Page number (starts at 1)', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    description: 'Movies per page',
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  pageSize?: number;
}
