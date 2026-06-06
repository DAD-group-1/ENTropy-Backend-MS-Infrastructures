import { Module } from '@nestjs/common';
import { RoomTypeController } from './room-type.controller';
import { RoomTypeService } from './room-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType } from './entities/room-type.entity';
import { Room } from '../rooms/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType, Room])],
  controllers: [RoomTypeController],
  providers: [RoomTypeService],
})
export class RoomTypeModule {}
