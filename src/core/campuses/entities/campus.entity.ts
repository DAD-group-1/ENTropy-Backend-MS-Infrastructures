import { InternalCampus } from '@dad-group-1/backend-common';
import { Entity, OneToMany } from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';
import { Building } from '../../buildings/entities/building.entity';
import { RoomType } from '../../room-types/entities/room-type.entity';

@Entity()
export class Campus extends InternalCampus {
  @OneToMany(() => Room, (room) => room.campus)
  rooms: Room[];

  @OneToMany(() => RoomType, (roomType) => roomType.campus)
  room_types: RoomType[];

  @OneToMany(() => Building, (building) => building.campus)
  buildings: Building[];
}
