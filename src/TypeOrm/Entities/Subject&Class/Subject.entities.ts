

import { ClassLevels, Subjects } from 'src/Shared/Enums/enum';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Lead } from '../lead/lead.entities';
import { TeacherClassSubject } from 'src/Modules/TeacherService/Entity/teacher.entities';


@Entity("subject")
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type:"varchar",
  

  })
  name:Subjects;

  @OneToMany(() => TeacherClassSubject, (teachingclasssubject) => teachingclasssubject.subject)
  teacher: TeacherClassSubject[];

  @ManyToMany(() => Lead, (lead) => lead.subjects)
  @JoinTable()
  leads: Lead[];

}


@Entity("classlevel")
export class ClassLevel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string; 


    @Column("int", { nullable: true })
    minClass: number; 
  
    @Column("int", { nullable: true })
    maxClass: number;

    @Column({ type: 'boolean', default: false })
    isOpenEnded: boolean;
  
    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'datetime' })
    updated_at: Date;



    @OneToMany(() => TeacherClassSubject, (teachingsubject) => teachingsubject.classLevel)
    teacher: TeacherClassSubject[];


}


