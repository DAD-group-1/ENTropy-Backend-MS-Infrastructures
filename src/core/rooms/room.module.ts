import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { RoomType } from '../room-types/entities/room-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, RoomType])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
