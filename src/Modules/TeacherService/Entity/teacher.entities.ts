



import { EmployeeProfile } from 'src/Modules/AdminService/Entity/employee.entities';
import { MembershipType, RegistrationStatus } from 'src/Shared/Enums/enum';
import { Address } from 'src/TypeOrm/Entities/Address/Address.entites';


import { AvailabilityDays, AvailabilityTime } from 'src/TypeOrm/Entities/AvailabilityDay&Time/Availability.entities';
import { Lead,  TeacherLeadActivity} from 'src/TypeOrm/Entities/lead/lead.entities';
import { ClassLevel, Subject } from 'src/TypeOrm/Entities/Subject&Class/Subject.entities';
import { User } from 'src/TypeOrm/Entities/User/User.entities';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany, UpdateDateColumn, CreateDateColumn, ManyToMany } from 'typeorm';








@Entity('teacherprofile')
export class TeacherProfile {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.teacherProfile)
  @JoinColumn() 
  user: User;

  @Column({ type: "varchar", nullable: true })
  year_of_experience: string;

  @Column({ type: 'varchar', nullable: false })
  age: string;

  @OneToOne(() => Address, address => address.teacher, { cascade: true })
  @JoinColumn()
  address: Address;

  @OneToMany(() => TeacherEducationQualification, educationQualification => educationQualification.teacher, { cascade: true })
  educationQualifications: TeacherEducationQualification[];

  @OneToMany(() => TeacherCertification, teacherCertification => teacherCertification.teacher, { cascade: true })
  certifications: TeacherCertification[];

  @OneToMany(() => TeacherClassSubject, teachingDetail => teachingDetail.teacher, { cascade: true })
  teachersubject: TeacherClassSubject[];

  @OneToMany(() => TeacherAvailabilityTime, teacherAvailabilityTime => teacherAvailabilityTime.teacher, { cascade: true })
  teacherAvailabilityTime: TeacherAvailabilityTime[];

  @OneToMany(() => TeacherLeadActivity, (teacherleadactivity) => teacherleadactivity.teacher)
  leadsActivity: TeacherLeadActivity[];

  @ManyToOne(() => EmployeeProfile, employee => employee.teacher_verified)
  verifiedByEmployeeId: EmployeeProfile;

  @Column({ type: 'datetime', nullable: true })
  verifiedAt: Date | null; 

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @Column({ type: "boolean", default: false })
  isPendingApproval: boolean;

  @Column({ type: 'enum', enum: MembershipType, default: MembershipType.NONE })
  membershipType: MembershipType;

  @Column({ type: 'datetime', nullable: true })
  membershipPurchasedAt: Date | null;

  @Column({ type: 'boolean', default: false })
  isVerified_By_Studyhelpline: boolean;

  @Column({
    type: 'enum',
    enum: RegistrationStatus,
    default: RegistrationStatus.PENDING,
  })
  registrationStatus: RegistrationStatus;

  @Column({ type: 'boolean', default: false })
  registrationFeePaid: boolean;

  @Column({ type: 'boolean', default: false })
  call_notification: boolean;
}




@Entity('teachereducationqualification')
export class TeacherEducationQualification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  university: string;

  @Column({ type: 'varchar', length: 100 })
  degree: string;

  @Column({ type: 'varchar', length: 50 })
  degreeType: string; 

  @Column({ type: 'varchar', length: 100 })
  specialization: string;

  @Column({ type: 'year', nullable: true })
  startYear: number;

  @Column({ type: 'year', nullable: true })
  endYear: number;

  @ManyToOne(() => TeacherProfile, (teacher) => teacher.educationQualifications,)
  teacher: TeacherProfile;
  @CreateDateColumn({ type: 'datetime' }) 
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' }) 
  updated_at: Date;
}


@Entity('teachercertifications')
export class TeacherCertification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Subject, { nullable: false })
  subject: Subject; 

  @Column({ type: 'varchar', length: 100 })
  Institute: String;

  @Column({ type: 'year', nullable: true })
  startYear: number;

  @Column({ type: 'year', nullable: true })
  endYear: number;

  @ManyToOne(() => TeacherProfile, (teacher) => teacher.certifications,)
  teacher: TeacherProfile;
  @CreateDateColumn({ type: 'datetime' }) 
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' }) 
  updated_at: Date;



}



@Entity("teacherclasssubject")
export class TeacherClassSubject {
    @PrimaryGeneratedColumn()
    id: number;  

    @ManyToOne(()=>TeacherProfile, (teacher)=>teacher.teachersubject,)
    teacher: TeacherProfile;

    @ManyToOne(() => Subject, (subject) => subject.teacher,{ eager: true } )
    subject: Subject;  

    @ManyToOne(() => ClassLevel, (classLevel) => classLevel.teacher)
    classLevel: ClassLevel;  

    @CreateDateColumn({ type: 'datetime' }) 
    created_at: Date;
  
    @UpdateDateColumn({ type: 'datetime' }) 
    updated_at: Date;
   
}


@Entity("teacheravailabilitytime")
export class TeacherAvailabilityTime{


@PrimaryGeneratedColumn()
id:number;

@ManyToOne(()=>TeacherProfile, (teacher)=>teacher.teacherAvailabilityTime,)
teacher: TeacherProfile;


@ManyToOne(()=>AvailabilityDays,availabilityDays=>availabilityDays.teacherAvailablityDay, )
days:AvailabilityDays

@ManyToOne(()=>AvailabilityTime,availabilityDays=>availabilityDays.teacherAvailablityTime, )
time:AvailabilityTime
@CreateDateColumn({ type: 'datetime' }) 
created_at: Date;

@UpdateDateColumn({ type: 'datetime' }) 
updated_at: Date;




} 



// @Entity("teacherpreferedlocation")
// export class TeacherPreferedLocation{


//   @PrimaryGeneratedColumn()
//   id:number
    
//   @Column({type:"varchar",length:50,nullable:false})
//   city:string

//   @Column({ type: 'decimal', precision: 9, scale: 6, nullable:false })
//   latitude: number; 

//   @Column({ type: 'decimal', precision: 9, scale: 6, nullable:false })
//   longitude: number; 


//   @ManyToOne(()=>User,user=>user.teacherPreferedLocation,)
//    teacherid:User

//    @CreateDateColumn({ type: 'datetime' }) // Add created_at timestamp
//    created_at: Date;
 
//    @UpdateDateColumn({ type: 'datetime' }) // Add updated_at timestamp
//    updated_at: Date;

// }



// @Entity('teacher_membership_log')
// export class TeacherMembershipLog {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => TeacherProfile, (teacher) => teacher.subscription_logs, { onDelete: 'CASCADE' })
//   teacher: TeacherProfile;

//   @Column({ type: 'varchar', nullable: true })
//   Subscription: string; 

//   @Column({ type: 'integer', nullable: true })
//   previousLeadsCount: number; 

//   @CreateDateColumn()
//   timestamp: Date; 
// }





// @Entity('teacher_logs')
// export class TeacherActivityLog {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   teacherId: number;  

//   @Column({ type: 'json' })
//   previousValues: any;  

//   @Column({ type: 'json' })
//   newValues: any;  

//   @Column({ type: 'varchar', length: 50 })
//   updatedBy: string;  

//   @Column({ type: 'boolean', default: false })
//   isApproved: boolean;  

//   @CreateDateColumn()
//   createdAt: Date; 
// }
