import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { FilterMoviesDto } from './dto/filter-movies.dto';
import { Movie } from './entities/movie.entity';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { PaginatedMoviesDto } from './dto/paginated-movies.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new movie' })
  @ApiCreatedResponse({ description: 'Movie has been created', type: Movie })
  create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all movies with filtering and sorting' })
  @ApiOkResponse({ type: PaginatedMoviesDto })
  findAll(@Query() filter: FilterMoviesDto): Promise<PaginatedMoviesDto> {
    return this.moviesService.findAll(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a movie by ID' })
  @ApiOkResponse({ type: Movie })
  findOne(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a movie by ID' })
  @ApiOkResponse({ type: Movie })
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a movie by ID' })
  remove(@Param('id') id: string): Promise<void> {
    return this.moviesService.remove(id);
  }
}
