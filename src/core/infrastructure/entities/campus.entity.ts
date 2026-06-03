import { InternalCampus } from '@dad-group-1/backend-common';
import { Entity, OneToMany } from 'typeorm';
import { Room } from './room.entity';
import { RoomType } from './room-type.entity';
import { Building } from './building.entity';

@Entity()
export class Campus extends InternalCampus {
  @OneToMany(() => Room, (room) => room.campus)
  rooms: Room[];

  @OneToMany(() => RoomType, (roomType) => roomType.campus)
  room_types: RoomType[];

  @OneToMany(() => Building, (building) => building.campus)
  buildings: Building[];
}
