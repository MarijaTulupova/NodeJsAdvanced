import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CreaturesModule } from './creatures/creatures.module';
import { HabitatsModule } from './habitats/habitats.module';

import { User } from './users/entities/user.entity';
import { Creature } from './creatures/entities/creature.entity';
import { Habitat } from './habitats/entities/habitat.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Creature, Habitat],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CreaturesModule,
    HabitatsModule,
  ],
})
export class AppModule {}
