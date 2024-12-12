

import { Gender, RegistrationStatus } from "src/Shared/Enums/enum";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Language, Roles } from "../Role/role.entities";
import { TeacherProfile } from "src/Modules/TeacherService/Entity/teacher.entities";
import { Lead } from "../lead/lead.entities";
import { EmployeeProfile } from "src/Modules/AdminService/Entity/employee.entities";




@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  first_name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  last_name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender: Gender;

  @Column({ type: 'varchar', length: 10, nullable: false, unique: true })
  phone_number: string;

  @Column({ type: 'varchar', length: 10, nullable: true, unique: true })
  whatsapp_number: string;

  @Column({ type: 'varchar', length: 255, nullable:true })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  refresh_token: string;


  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @Column({ type: 'boolean', default: false })
  isEmail_verified: boolean;

  @Column({ type: 'boolean', default: false })
  isVerified_By_Studyhelpline: boolean;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;


  @ManyToOne(() => Roles, role => role.users)
  role: Roles;


  @ManyToMany(()=>Language,language=>language.users,{})
  @JoinTable({
    name:"user_languages",
    joinColumn:{name:"user_id",referencedColumnName:"id"},
    inverseJoinColumn:{name:"language_id",referencedColumnName:"id"}
  })
  languages:Language[]


@OneToMany(()=>Lead,lead=>lead.student)
leads:Lead[]

  @OneToOne (() => TeacherProfile, (teacherProfile) => teacherProfile.user, {
    cascade: true, 
  })
  teacherProfile: TeacherProfile;

  @OneToOne(() => EmployeeProfile, (employeeProfile) => employeeProfile.user)
  employeeProfile: EmployeeProfile;



}




