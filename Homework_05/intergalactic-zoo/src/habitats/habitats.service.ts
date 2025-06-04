import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habitat } from './entities/habitat.entity';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { UpdateHabitatDto } from './dto/update-habitat.dto';
import { Creature } from '../creatures/entities/creature.entity';

@Injectable()
export class HabitatsService {
  constructor(
    @InjectRepository(Habitat)
    private habitatRepository: Repository<Habitat>,

    @InjectRepository(Creature)
    private creatureRepository: Repository<Creature>,
  ) {}

  async create(createHabitatDto: CreateHabitatDto): Promise<Habitat> {
    const existing = await this.habitatRepository.findOneBy({
      name: createHabitatDto.name,
    });
    if (existing) {
      throw new ConflictException(
        `Habitat with name '${createHabitatDto.name}' already exists.`,
      );
    }
    const habitat = this.habitatRepository.create(createHabitatDto);
    return this.habitatRepository.save(habitat);
  }

  async findAll(): Promise<Habitat[]> {
    return await this.habitatRepository.find();
  }

  async findOne(id: string): Promise<Habitat> {
    const habitat = await this.habitatRepository.findOne({
      where: { id },
      relations: ['creatures'],
    });

    if (!habitat) {
      throw new NotFoundException(`Habitat with ID ${id} not found`);
    }

    return habitat;
  }

  async update(
    id: string,
    updateHabitatDto: UpdateHabitatDto,
  ): Promise<Habitat> {
    const habitat = await this.habitatRepository.preload({
      id,
      ...updateHabitatDto,
    });

    if (!habitat) {
      throw new NotFoundException(`Habitat with ID ${id} not found`);
    }

    return await this.habitatRepository.save(habitat);
  }

  async remove(id: string): Promise<void> {
    const habitat = await this.habitatRepository.findOne({
      where: { id },
      relations: ['creatures'],
    });

    if (!habitat) {
      throw new NotFoundException(`Habitat with ID ${id} not found`);
    }

    const assignedCreatures = await this.creatureRepository.count({
      where: { habitat: { id } },
    });

    if (assignedCreatures > 0) {
      throw new ForbiddenException(
        `Cannot delete habitat with ${assignedCreatures} creature(s) still assigned`,
      );
    }

    await this.habitatRepository.remove(habitat);
  }
}
