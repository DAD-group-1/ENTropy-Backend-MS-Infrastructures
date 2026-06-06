import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CampusModule } from './core/campuses/campus.module';
import { RoomModule } from './core/rooms/room.module';
import { BuildingModule } from './core/buildings/building.module';
import { RoomTypeModule } from './core/room-types/room-type.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    CampusModule,
    RoomModule,
    BuildingModule,
    RoomTypeModule,
  ],
})
export class AppModule {}
