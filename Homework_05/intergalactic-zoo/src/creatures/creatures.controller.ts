import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { CreaturesService } from './creatures.service';
import { CreateCreatureDto } from './dto/create-creature.dto';
import { UpdateCreatureDto } from './dto/update-creature.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Creatures')
@ApiBearerAuth()
@Controller('creatures')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CreaturesController {
  constructor(private readonly creaturesService: CreaturesService) {}

  @Post()
  @Roles('Zookeeper')
  @ApiOperation({ summary: 'Create a new creature' })
  @ApiResponse({ status: 201, description: 'Creature created successfully.' })
  @ApiBody({ type: CreateCreatureDto })
  create(@Body() dto: CreateCreatureDto) {
    return this.creaturesService.create(dto);
  }

  @Get()
  @Roles('Zookeeper', 'Visitor')
  @ApiOperation({ summary: 'Get all creatures' })
  @ApiResponse({ status: 200, description: 'List of creatures returned.' })
  findAll() {
    return this.creaturesService.findAll();
  }

  @Get(':id')
  @Roles('Zookeeper', 'Visitor')
  @ApiOperation({ summary: 'Get a creature by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the creature' })
  @ApiResponse({ status: 200, description: 'Creature details returned.' })
  @ApiResponse({ status: 404, description: 'Creature not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.creaturesService.findOne(id);
  }

  @Patch(':id')
  @Roles('Zookeeper')
  @ApiOperation({ summary: 'Update a creature by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the creature to update' })
  @ApiResponse({ status: 200, description: 'Creature updated successfully.' })
  @ApiResponse({ status: 404, description: 'Creature not found.' })
  @ApiBody({ type: UpdateCreatureDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCreatureDto,
  ) {
    return this.creaturesService.update(id, dto);
  }

  @Delete(':id')
  @Roles('Zookeeper')
  @ApiOperation({ summary: 'Delete a creature by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the creature to delete' })
  @ApiResponse({ status: 204, description: 'Creature deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Creature not found.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.creaturesService.remove(id);
  }
}
