import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AvailabilityDays, AvailabilityTime } from './Entities/AvailabilityDay&Time/Availability.entities';
import { ClassLevel, Subject } from './Entities/Subject&Class/Subject.entities';

import { Address } from './Entities/Address/Address.entites';
import { Lead, TeacherLeadActivity, TeacherLeadActivityLog } from './Entities/lead/lead.entities';
import { User } from './Entities/User/User.entities';
import { Language, Roles } from './Entities/Role/role.entities';



@Module({
  imports: [

    TypeOrmModule.forFeature([User,Address,AvailabilityDays,AvailabilityTime,Subject,ClassLevel,Lead,TeacherLeadActivity,Roles,Language,TeacherLeadActivityLog]),
  ],
  providers:[],
  exports: [TypeOrmModule,], 
})
export class TypeormEntity {}