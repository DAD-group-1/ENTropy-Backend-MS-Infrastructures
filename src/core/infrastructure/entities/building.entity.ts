import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { InternalBuilding } from '@dad-group-1/backend-common';
import { Campus } from './campus.entity';
import { Room } from './room.entity';

@Entity()
export class Building extends InternalBuilding {
  @ManyToOne(() => Campus, (campus) => campus.id)
  @JoinColumn({ name: 'campus_id' })
  campus: Campus;

  @OneToMany(() => Room, (room) => room.id)
  rooms: Room[];
}
