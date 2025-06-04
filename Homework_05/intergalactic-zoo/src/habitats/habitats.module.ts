import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HabitatsController } from './habitats.controller';
import { HabitatsService } from './habitats.service';
import { Habitat } from './entities/habitat.entity';
import { Creature } from '../creatures/entities/creature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habitat, Creature])],
  controllers: [HabitatsController],
  providers: [HabitatsService],
  exports: [HabitatsService],
})
export class HabitatsModule {}
