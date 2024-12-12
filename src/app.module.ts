import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './TypeOrm/Database/db.module';
import { TypeormEntity } from './TypeOrm/Tyeorm.module';
import { TeacherModule } from './Modules/TeacherService/Teacher.module';
import { EmployeeModule } from './Modules/AdminService/Employee/Employee.module';
import { LeadModule } from './Modules/Leads/Lead.module';
import { AdminModule } from './Modules/AdminService/Admin/Admin.module';

@Module({
  imports: [ 
  
    DBModule.forRoot({entities:[]}),
    LeadModule,
    TypeormEntity,
    TeacherModule,
    EmployeeModule,
    AdminModule
    
    
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
