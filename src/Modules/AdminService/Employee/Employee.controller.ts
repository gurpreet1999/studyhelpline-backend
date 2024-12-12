import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";


import { EmployeeService } from "./Employee.service";
import { TeacherCreatedByEmployeeDto } from "../Dtos/createTeacher.dto";
import { CreateLeadDto, UpdateTeacherLeadActivityDto } from "src/Modules/Leads/Dtos/lead.dto";




@Controller('employee')
export class EmployeeController{

constructor(private readonly employeeService:EmployeeService ) {}


@Post('/teacher')
async createTeacher( @Body() teacher:TeacherCreatedByEmployeeDto){

return this.employeeService.createTeacher(teacher)

}


@Get('/:id')
async individualEmployeeDetail(id:number){

    return this.employeeService.findEmployeeById(id)
}


@Get('/:id/teacher')
async teacherCreatedByEmployee(id:number){
    return this.employeeService.teacherCreatedByEmployeeId(id)
}

@Post('/:id/lead')
async createLead(@Body() lead:CreateLeadDto , @Param('id') id:number){
    this.employeeService.createLead(lead,id)
}




@Get('/lead')
async  AllLeadCreatedByEmployee(id:number){
    this.employeeService.AllLeadByEmployee(id)
}

@Get('/lead/:id')
async leadById(id:number){
    this.employeeService.leadById(id)
}

@Put('/lead/:id')
async updateLead(lead:UpdateTeacherLeadActivityDto){
    this.employeeService.updateLead(lead)
}





}