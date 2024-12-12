import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../User/User.entities";
import { RoleType } from "src/Shared/Enums/enum";

@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({
    type: 'enum',
    enum: RoleType,
    nullable: false,
  })
  role_name: RoleType; 

  @OneToMany(() => User, user => user.role)
    users: User[];

}

@Entity('languages')
export class Language {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    name: string;

    @ManyToMany(()=>User, user=>user.languages)
    users: User[];
  
}