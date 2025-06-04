import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Creature } from 'src/creatures/entities/creature.entity';

@Entity('habitats')
@Unique(['name'])
export class Habitat {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'b3f9d6c2-4864-4b4d-90e7-f829afc6c7c7' })
  id: string;

  @Column()
  @ApiProperty({
    example: 'Crystal Caves of Xylar',
    description: 'Unique name of the habitat',
  })
  name: string;

  @Column()
  @ApiProperty({
    example: 'Arctic Tundra',
    description: 'Type of climate in the habitat',
  })
  climateType: string;

  @Column()
  @ApiProperty({
    example: 'Rocky, Subterranean',
    description: 'Terrain description of the habitat',
  })
  terrain: string;

  @Column('int')
  @ApiProperty({
    example: 20,
    description: 'Maximum number of creatures this habitat can hold',
  })
  maxCapacity: number;

  @CreateDateColumn()
  @ApiProperty({ example: '2025-06-03T12:00:00Z' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ example: '2025-06-03T12:00:00Z' })
  updatedAt: Date;

  @OneToMany(() => Creature, (creature) => creature.habitat)
  @ApiProperty({
    type: () => [Creature],
    description: 'List of creatures in this habitat',
    required: false,
  })
  creatures: Creature[];
}
