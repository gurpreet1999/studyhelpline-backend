



import { Subject } from 'src/TypeOrm/Entities/Subject&Class/Subject.entities';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, UpdateDateColumn, OneToOne } from 'typeorm';


export enum RegistrationStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export enum UserStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  SUSPENDED = 'Suspended',
}
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

@Entity('studentquery')
export class User {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable:true, unique: true })
  email: string; 
  
//   @OneToMany(()=>Subject,subject.user)
//    subjects:Subject[]

//    @

}


@Entity('chatboxquery')
export class studentChatboxQuery{

@PrimaryGeneratedColumn()
id:number;
@Column({ type: 'varchar', length: 255, nullable:false, unique: true })
query_description:string;

}


