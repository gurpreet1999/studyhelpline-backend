import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { EmployeeService } from "./Employee.service";
import { EmployeeController } from "./Employee.controller";

import { TypeormEntity } from "src/TypeOrm/Tyeorm.module";
import { TeacherModule } from "src/Modules/TeacherService/Teacher.module";
import { EmployeeProfile } from "../Entity/employee.entities";
import { LeadModule } from "src/Modules/Leads/Lead.module";


@Module({

    imports: [TypeormEntity,TeacherModule,TypeOrmModule.forFeature([EmployeeProfile])  , TeacherModule,LeadModule],
    providers: [EmployeeService],
    controllers: [EmployeeController],
    exports: [EmployeeService,TypeOrmModule]

})

export class EmployeeModule{}