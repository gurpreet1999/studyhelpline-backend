import { Module } from "@nestjs/common";
import { EmployeeModule } from "../Employee/Employee.module";
import { AdminController } from "./Admin.controller";
import { AdminService } from "./Admin.service";
import { TypeormEntity } from "src/TypeOrm/Tyeorm.module";

@Module({

    imports: [EmployeeModule,TypeormEntity],
    controllers: [AdminController], 
    providers: [AdminService], 
    exports: [AdminService], 

})

export class AdminModule{}