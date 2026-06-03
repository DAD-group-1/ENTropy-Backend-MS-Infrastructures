import { InternalSchedule } from '@dad-group-1/backend-common';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Course } from './course.entity';

@Entity()
export class Schedule extends InternalSchedule {
  @ManyToOne(() => Course, (course) => course.id)
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
