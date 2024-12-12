import { TeacherAvailabilityTime } from 'src/Modules/TeacherService/Entity/teacher.entities';
import { Days, Time, TimeRange } from 'src/Shared/Enums/enum';

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, ConnectionCheckOutFailedEvent } from 'typeorm';
import { Lead } from '../lead/lead.entities';


@Entity('availabilitydays')
export class AvailabilityDays {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({
    type: 'enum',
    enum:Days,
    nullable: false,
  })
  day:Days; 

@OneToMany(()=>TeacherAvailabilityTime, teacherAvailabilityTime=>teacherAvailabilityTime.days)
teacherAvailablityDay:TeacherAvailabilityTime[]


@ManyToMany(() => Lead,lead=>lead.days)
@JoinTable() 
lead:Lead[]

}


@Entity('availabilitytime')
export class AvailabilityTime {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({
    type: "varchar",
  
  })
  timeCategory: string; 



  @Column({
    type: "varchar",
  
  })
  start: string;

  @Column({
    type: "varchar",
  
  })
  end: string;

  @ManyToMany(() => Lead,lead=>lead.times)
  @JoinTable() 
  lead:Lead[]
  
  @OneToMany(()=>TeacherAvailabilityTime, teacherAvailabilityTime=>teacherAvailabilityTime.time)
  teacherAvailablityTime:TeacherAvailabilityTime[]


}