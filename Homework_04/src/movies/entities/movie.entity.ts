import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '../enums/genre.enum';

@Entity('movies')
export class Movie {
  @ApiProperty({ description: 'UUID of the movie' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Title of the movie' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ description: 'Description of the movie' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: 'Release year of the movie' })
  @Column({ type: 'int', name: 'release_year' })
  releaseYear: number;

  @ApiProperty({ description: 'Genre of the movie', enum: Genre })
  @Column({ type: 'enum', enum: Genre })
  genre: Genre;

  @ApiProperty({ description: 'Duration of the movie in minutes' })
  @Column({ type: 'int' })
  duration: number;

  @ApiProperty({ description: 'Rating of the movie (1-10)' })
  @Column({ type: 'decimal', precision: 3, scale: 1 })
  rating: number;

  @ApiProperty({ description: 'URL of the movie poster', required: false })
  @Column({ type: 'varchar', length: 255, nullable: true, name: 'poster_url' })
  posterUrl?: string;

  @ApiProperty({ description: 'Date when the movie was created' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the movie was last updated' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
