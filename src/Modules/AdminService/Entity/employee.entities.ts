

import { TeacherProfile } from "src/Modules/TeacherService/Entity/teacher.entities";
import { Lead } from "src/TypeOrm/Entities/lead/lead.entities";
import { User } from "src/TypeOrm/Entities/User/User.entities";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


export enum EmployeeDesignation {
  TellerCaller = "TellerCaller", 
  Manager = "Manager",    
  Supervisor = "Supervisor" 
}





@Entity('employeeprofile')
export class EmployeeProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 12, unique: true })
  adhaar_no: string;

  @Column({ type: 'varchar', nullable: true })
  adhaar_photo: string;

  @OneToMany(() => TeacherProfile, (teacher) => teacher.verifiedByEmployeeId)
  teacher_verified: TeacherProfile[];

  @OneToMany(() => Lead, (lead) => lead.handledByEmployeeId)
  handledLeads: Lead[];

  @CreateDateColumn()
  joining_date: Date;

  @Column({
    type: "enum",
    enum: EmployeeDesignation,
    nullable: false
  })
  designation: EmployeeDesignation;


  @OneToOne(() => User, (user) => user.employeeProfile)
  @JoinColumn()  
  user: User;

}