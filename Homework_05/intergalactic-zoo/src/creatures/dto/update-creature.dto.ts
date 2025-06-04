import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DangerLevel } from 'src/enums/danger-level.enum';

export class UpdateCreatureDto {
  @ApiPropertyOptional({
    example: 'Zorgon',
    description: 'The name of the creature',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Draconoid',
    description: 'The species of the creature',
  })
  @IsOptional()
  @IsString()
  species?: string;

  @ApiPropertyOptional({
    example: 'Xenor',
    description: 'The planet the creature comes from',
  })
  @IsOptional()
  @IsString()
  originPlanet?: string;

  @ApiPropertyOptional({
    enum: DangerLevel,
    description: 'The danger level of the creature',
  })
  @IsOptional()
  @IsEnum(DangerLevel)
  dangerLevel?: DangerLevel;

  @ApiPropertyOptional({
    example: 'Tropical',
    description: 'The climate this creature prefers',
  })
  @IsOptional()
  @IsString()
  preferredClimate?: string;

  @ApiPropertyOptional({
    example: 'https://images.zoo.com/zorgon.png',
    description: 'Optional image URL of the creature',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    example: 'abc123-habitat-id',
    description: 'Updated habitat assignment',
    required: false,
  })
  @IsOptional()
  @IsString()
  habitatId?: string;
}
