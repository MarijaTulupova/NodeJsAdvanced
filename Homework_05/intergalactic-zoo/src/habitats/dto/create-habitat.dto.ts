import { IsNotEmpty, IsString, IsInt, Min, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHabitatDto {
  @ApiProperty({
    example: 'Crystal Caves of Xylar',
    description: 'Unique name of the habitat',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: 'Arctic Tundra',
    description: 'Type of climate in the habitat',
  })
  @IsNotEmpty()
  @IsString()
  climateType: string;

  @ApiProperty({
    example: 'Rocky, Subterranean',
    description: 'Terrain description of the habitat',
  })
  @IsNotEmpty()
  @IsString()
  terrain: string;

  @ApiProperty({
    example: 20,
    description: 'Maximum number of creatures this habitat can hold',
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  maxCapacity: number;
}
