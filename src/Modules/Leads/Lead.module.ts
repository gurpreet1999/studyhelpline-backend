import { forwardRef, Module } from '@nestjs/common';
import { TypeormEntity } from 'src/TypeOrm/Tyeorm.module';
import { LeadService } from './Lead.service';
import { LeadController } from './Lead.controller';
import { TeacherModule } from '../TeacherService/Teacher.module';


@Module({
  imports: [TypeormEntity,forwardRef(() => TeacherModule)],
  providers: [LeadService],
  controllers: [LeadController],
  exports:[LeadService]
})
export class LeadModule {}