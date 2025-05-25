import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  MaxLength,
  Min,
  Max,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Genre } from '../enums/genre.enum';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    description: 'Title of the movie',
    example: 'Inception',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Movie description',
    example:
      'A thief who steals corporate secrets through dream-sharing technology.',
  })
  description: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Min(1888)
  @Max(new Date().getFullYear())
  @ApiProperty({
    description: 'Year the movie was released',
    example: 2010,
  })
  releaseYear: number;

  @IsEnum(Genre)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Genre of the movie',
    enum: Genre,
    example: Genre.SCI_FI,
  })
  genre: Genre;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({
    description: 'Duration of the movie in minutes',
    example: 148,
  })
  duration: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(10)
  @ApiProperty({
    description: 'Rating of the movie from 1 to 10',
    example: 8,
  })
  rating: number;

  @IsString()
  @IsOptional()
  @IsUrl()
  @ApiPropertyOptional({
    description: 'URL to the movie poster image',
    example: 'https://image.tmdb.org/t/p/original/poster.jpg',
  })
  posterUrl?: string;
}
