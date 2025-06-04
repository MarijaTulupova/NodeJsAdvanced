import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreaturesService } from './creatures.service';
import { CreaturesController } from './creatures.controller';
import { Creature } from './entities/creature.entity';
import { Habitat } from '../habitats/entities/habitat.entity';
import { HabitatsModule } from '../habitats/habitats.module';

@Module({
  imports: [TypeOrmModule.forFeature([Creature, Habitat]), HabitatsModule],
  controllers: [CreaturesController],
  providers: [CreaturesService],
})
export class CreaturesModule {}
