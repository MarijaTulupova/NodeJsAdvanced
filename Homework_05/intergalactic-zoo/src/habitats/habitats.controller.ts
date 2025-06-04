import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { HabitatsService } from './habitats.service';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { UpdateHabitatDto } from './dto/update-habitat.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Habitat } from './entities/habitat.entity';

@ApiTags('Habitats')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('habitats')
export class HabitatsController {
  constructor(private readonly habitatsService: HabitatsService) {}

  @Post()
  @Roles('Zookeeper')
  @ApiOperation({ summary: 'Create a new habitat (Zookeepers only)' })
  @ApiResponse({
    status: 201,
    description: 'Habitat created successfully',
    type: Habitat,
  })
  create(@Body() createHabitatDto: CreateHabitatDto) {
    return this.habitatsService.create(createHabitatDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all habitats (Authenticated users)' })
  @ApiResponse({
    status: 200,
    description: 'List of habitats',
    type: [Habitat],
  })
  findAll() {
    return this.habitatsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific habitat by ID (Authenticated users)',
  })
  @ApiResponse({ status: 200, description: 'Habitat found', type: Habitat })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.habitatsService.findOne(id);
  }

  @Patch(':id')
  @Roles('Zookeeper')
  @ApiOperation({ summary: 'Update a habitat (Zookeepers only)' })
  @ApiResponse({ status: 200, description: 'Habitat updated', type: Habitat })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateHabitatDto: UpdateHabitatDto,
  ) {
    return this.habitatsService.update(id, updateHabitatDto);
  }

  @Delete(':id')
  @Roles('Zookeeper')
  @ApiOperation({ summary: 'Delete a habitat (Zookeepers only)' })
  @ApiResponse({ status: 200, description: 'Habitat deleted successfully' })
  @ApiResponse({
    status: 403,
    description: 'Cannot delete if creatures are still assigned',
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.habitatsService.remove(id);
  }
}
