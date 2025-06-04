import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DangerLevel } from 'src/enums/danger-level.enum';

export class CreateCreatureDto {
  @ApiProperty({
    example: 'Zorgon',
    description: 'The name of the creature',
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @ApiProperty({
    example: 'Draconoid',
    description: 'The species of the creature',
  })
  @IsString()
  @IsNotEmpty()
  species: string;

  @ApiProperty({
    example: 'Xenor',
    description: 'The planet the creature comes from',
  })
  @IsString()
  @IsNotEmpty()
  originPlanet: string;

  @ApiProperty({
    enum: DangerLevel,
    description: 'The danger level of the creature',
  })
  @IsEnum(DangerLevel)
  dangerLevel: DangerLevel;

  @ApiProperty({
    example: 'Tropical',
    description: 'The climate this creature prefers',
  })
  @IsString()
  @IsNotEmpty()
  preferredClimate: string;

  @ApiProperty({
    example: 'https://images.zoo.com/zorgon.png',
    description: 'Optional image URL of the creature',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  imageUrl?: string;

  @ApiProperty({
    example: 'abc123-habitat-id',
    description: 'The ID of the habitat this creature belongs to',
    required: false,
  })
  @IsOptional()
  @IsString()
  habitatId?: string;
}
