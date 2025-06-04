import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Creature } from './entities/creature.entity';
import { CreateCreatureDto } from './dto/create-creature.dto';
import { UpdateCreatureDto } from './dto/update-creature.dto';
import { Habitat } from 'src/habitats/entities/habitat.entity';

@Injectable()
export class CreaturesService {
  constructor(
    @InjectRepository(Creature)
    private readonly creatureRepo: Repository<Creature>,

    @InjectRepository(Habitat)
    private readonly habitatRepo: Repository<Habitat>,
  ) {}

  async create(dto: CreateCreatureDto): Promise<Creature> {
    const creature = this.creatureRepo.create(dto);

    if (dto.habitatId) {
      const habitat = await this.habitatRepo.findOne({
        where: { id: dto.habitatId },
        relations: ['creatures'],
      });

      if (!habitat) throw new NotFoundException('Habitat not found');

      if (habitat.creatures.length >= habitat.maxCapacity) {
        throw new BadRequestException(
          `Habitat '${habitat.name}' is at full capacity`,
        );
      }

      creature.habitat = habitat;
    }

    return this.creatureRepo.save(creature);
  }

  async findAll(): Promise<Creature[]> {
    return this.creatureRepo.find({
      relations: ['habitat'],
    });
  }

  async findOne(id: string): Promise<Creature> {
    const creature = await this.creatureRepo.findOne({
      where: { id },
      relations: ['habitat'],
    });
    if (!creature) throw new NotFoundException('Creature not found');
    return creature;
  }

  async update(id: string, dto: UpdateCreatureDto): Promise<Creature> {
    const creature = await this.creatureRepo.findOne({
      where: { id },
      relations: ['habitat'],
    });

    if (!creature) throw new NotFoundException('Creature not found');

    const updated = this.creatureRepo.merge(creature, dto);

    if (dto.habitatId) {
      const habitat = await this.habitatRepo.findOne({
        where: { id: dto.habitatId },
        relations: ['creatures'],
      });

      if (!habitat) throw new NotFoundException('Habitat not found');

      const isSameHabitat = creature.habitat?.id === habitat.id;
      const isFull = habitat.creatures.length >= habitat.maxCapacity;

      if (!isSameHabitat && isFull) {
        throw new BadRequestException(
          `Habitat '${habitat.name}' is at full capacity`,
        );
      }

      updated.habitat = habitat;
    }

    return this.creatureRepo.save(updated);
  }

  async remove(id: string): Promise<void> {
    const creature = await this.creatureRepo.findOne({ where: { id } });
    if (!creature) throw new NotFoundException('Creature not found');
    await this.creatureRepo.remove(creature);
  }
}
