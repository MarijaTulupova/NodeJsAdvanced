import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DangerLevel } from 'src/enums/danger-level.enum';
import { Habitat } from 'src/habitats/entities/habitat.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('creatures')
@Unique(['name'])
export class Creature {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique identifier for the creature',
    example: 'c9f7b8d2-4d5e-4aef-a2fb-eef3f63d0a91',
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'Name of the creature',
    example: 'Xarthian Panther',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: 'Species of the creature',
    example: 'Panthera xarthia',
  })
  species: string;

  @Column()
  @ApiProperty({ description: 'Planet of origin', example: 'Xarth Prime' })
  originPlanet: string;

  @Column({
    type: 'enum',
    enum: DangerLevel,
  })
  @ApiProperty({
    description: 'Danger level of the creature',
    enum: DangerLevel,
    example: DangerLevel.CAUTION,
  })
  dangerLevel: DangerLevel;

  @Column()
  @ApiProperty({
    description: 'Preferred climate',
    example: 'Tropical Rainforest',
  })
  preferredClimate: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Image URL of the creature (optional)',
    example: 'https://example.com/image.png',
    required: false,
  })
  imageUrl?: string;

  @ManyToOne(() => Habitat, (habitat) => habitat.creatures, {
    nullable: false,
    onDelete: 'RESTRICT',
    eager: true,
  })
  @JoinColumn({ name: 'habitatId' })
  @ApiProperty({
    description: 'Habitat this creature belongs to',
    type: () => Habitat,
  })
  habitat: Habitat;

  @CreateDateColumn()
  @ApiProperty({ description: 'Date the creature was created' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Date the creature was last updated' })
  updatedAt: Date;
}
