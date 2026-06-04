import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { InternalRoomType } from '@dad-group-1/backend-common';
import { Campus } from '../../campuses/entities/campus.entity';
import { Room } from './room.entity';

@Entity()
export class RoomType extends InternalRoomType {
  @ManyToOne(() => Campus, (campus) => campus.id)
  @JoinColumn({ name: 'campus_id' })
  campus: Campus;

  @OneToMany(() => Room, (room) => room.id)
  rooms: Room[];
}
