import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { InternalBuilding } from '@dad-group-1/backend-common';
import { Campus } from '../../campuses/entities/campus.entity';
import { Room } from '../../rooms/entities/room.entity';

@Entity()
export class Building extends InternalBuilding {
  @ManyToOne(() => Campus, (campus) => campus.id)
  campus: Campus;

  @OneToMany(() => Room, (room) => room.id)
  rooms: Room[];
}
