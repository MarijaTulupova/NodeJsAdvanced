import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Movie } from '../movies/entities/movie.entity';

function getConfigValue<T>(configService: ConfigService, key: string): T {
  const value = configService.get<T>(key);
  if (value === undefined || value === null) {
    throw new Error(`Missing required config key: ${key}`);
  }
  return value;
}

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const host = getConfigValue<string>(configService, 'DB_HOST');
        const portStr = getConfigValue<string>(configService, 'DB_PORT');
        const port = Number(portStr);
        if (isNaN(port)) {
          throw new Error(
            'Invalid DB_PORT environment variable, must be a number',
          );
        }
        const username = getConfigValue<string>(configService, 'DB_USERNAME');
        const password = getConfigValue<string>(configService, 'DB_PASSWORD');
        const database = getConfigValue<string>(configService, 'DB_NAME');
        const nodeEnv = getConfigValue<string>(configService, 'NODE_ENV');

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: [Movie],
          synchronize: nodeEnv !== 'production',
        };
      },
    }),
  ],
})
export class DatabaseModule {}
