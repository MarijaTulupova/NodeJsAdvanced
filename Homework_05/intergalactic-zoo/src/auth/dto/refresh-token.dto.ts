import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    example: '4fd7a5f8-cccc-4444-bbbb-123456abcdef',
    description: 'The ID of the user',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: 'your-refresh-token-here',
    description: 'The refresh token issued at login',
  })
  @IsString()
  refreshToken: string;
}
