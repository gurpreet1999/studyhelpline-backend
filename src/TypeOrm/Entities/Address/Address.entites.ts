
import { TeacherProfile } from 'src/Modules/TeacherService/Entity/teacher.entities';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Lead } from '../lead/lead.entities';


export enum AddressType {
  HOME = 'home',
  WORK = 'work',
  OTHER = 'other',
}

@Entity('useraddress')
export class Address {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ type: 'varchar', length: 50, nullable: false })
  country: string; 

  @Column({ type: 'varchar', length: 50, nullable: false })
  state: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  city: string; 

  @Column({ type: 'varchar', length: 10, nullable: true })
  zip: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  district: string; 

  @Column({ type: 'varchar', length: 255, nullable: true })
  locality: string; 

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: false })
  latitude: number; 

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: false })
  longitude: number; 


  @OneToOne(()=>TeacherProfile , teacher=>teacher.address)
   teacher:TeacherProfile

    @OneToOne(()=>Lead,lead=>lead.address)
    lead:Lead

  @CreateDateColumn({ type: 'datetime' })
created_at: Date;

  @UpdateDateColumn({ type: 'datetime' }) 
updated_at: Date;


}
