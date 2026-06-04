import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CampusesModule } from './core/campuses/campuses.module';
import { RoomsModule } from './core/rooms/rooms.module';
import { BuildingsModule } from './core/buildings/buildings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    CampusesModule,
    RoomsModule,
    BuildingsModule,
  ],
})
export class AppModule {}
