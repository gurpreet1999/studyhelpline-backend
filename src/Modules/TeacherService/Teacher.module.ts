import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherService } from './Teacher.service';
import { TeacherController } from './teacher.controller';
import { TeacherAvailabilityTime, TeacherCertification, TeacherClassSubject, TeacherEducationQualification, TeacherProfile, } from './Entity/teacher.entities';
import { TypeormEntity } from 'src/TypeOrm/Tyeorm.module';
import { LeadModule } from '../Leads/Lead.module';


@Module({
  imports: [TypeOrmModule.forFeature([TeacherAvailabilityTime,TeacherEducationQualification,TeacherCertification,TeacherProfile,TeacherClassSubject]
   
  ),
  TypeormEntity
  ,
  forwardRef(()=>LeadModule)
  



],
  providers: [TeacherService],
  controllers: [TeacherController],
  exports:[TeacherService,TypeOrmModule]
})
export class TeacherModule {}