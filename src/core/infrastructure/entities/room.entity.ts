import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { InternalRoom } from '@dad-group-1/backend-common';
import { Campus } from './campus.entity';
import { Building } from './building.entity';
import { RoomType } from './room-type.entity';

@Entity()
export class Room extends InternalRoom {
  @ManyToOne(() => Campus, (campus) => campus.id)
  @JoinColumn({ name: 'campus_id' })
  campus: Campus;

  @ManyToOne(() => Building, (building) => building.id)
  @JoinColumn({ name: 'building_id' })
  building: Building;

  @ManyToOne(() => RoomType, (roomType) => roomType.id)
  @JoinColumn({ name: 'room_type_id' })
  roomType: RoomType;
}
