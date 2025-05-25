import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { FilterMoviesDto } from './dto/filter-movies.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(body: CreateMovieDto): Promise<Movie> {
    try {
      const movie = this.movieRepository.create(body);
      return await this.movieRepository.save(movie);
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );
    }
  }

  async findAll(
    filter: FilterMoviesDto,
  ): Promise<{ payload: Movie[]; total: number }> {
    const query = this.movieRepository.createQueryBuilder('movie');

    if (filter.genre)
      query.andWhere('movie.genre = :genre', { genre: filter.genre });

    if (filter.minRating !== undefined)
      query.andWhere('movie.rating >= :minRating', {
        minRating: filter.minRating,
      });

    if (filter.maxDuration !== undefined)
      query.andWhere('movie.duration <= :maxDuration', {
        maxDuration: filter.maxDuration,
      });

    if (filter.title)
      query.andWhere('movie.title ILIKE :title', {
        title: `%${filter.title}%`,
      });

    const sortBy = filter.sortBy || 'releaseYear';
    const sortOrder =
      filter.sortOrder?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    query.orderBy(`movie.${sortBy}`, sortOrder);

    const page = filter.page || 1;
    const pageSize = filter.pageSize || 10;
    const skip = (page - 1) * pageSize;

    query.skip(skip).take(pageSize);

    const [movies, total] = await query.getManyAndCount();

    return {
      payload: movies,
      total,
    };
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) throw new BadRequestException(`Movie with id ${id} not found`);
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) {
      throw new BadRequestException(
        `Cannot update. Movie with id ${id} not found`,
      );
    }

    await this.movieRepository.update(id, updateMovieDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.movieRepository.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException(
        `Cannot delete. Movie with id ${id} not found`,
      );
    }
  }
}
