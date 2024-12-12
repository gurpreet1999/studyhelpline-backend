import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";


import { EmployeeService } from "./Employee.service";
import { TeacherCreatedByEmployeeDto } from "../Dtos/createTeacher.dto";
import { CloseLeadDto, CreateLeadDto, leadDemoDto, leadTeacherSelectionDto, leadTeachingStatusDto, UpdateTeacherLeadActivityDto } from "src/Modules/Leads/Dtos/lead.dto";




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




@Get('/:id/lead')
async  AllLeadCreatedByEmployee(@Param('id') id:number){
    return this.employeeService.AllLeadByEmployee(id)
}



@Get('/:id/lead/:leadid')
async leadById( @Param('leadid')  id:number){
    this.employeeService.leadById(id)
}



@Put('/lead/:leadid')
async closeLead( @Param('leadid') id:number , @Body() data:CloseLeadDto){
    this.employeeService.closeLead(id,data)
}



@Put('/lead/:leadid/demo')
async updateDemo(@Param('leadid') id:number , @Body() data:leadDemoDto){


return this.employeeService.updateDemo(id,data)

}

@Put('/lead/:leadid/demo')
async updateTeacherSelected(@Param('leadid') id:number , @Body() data:leadTeacherSelectionDto){
    return this.employeeService.updateTeacherSelected(id,data)
}

@Put('/lead/:leadid/demo')
async updateLeadTeachingStatus(@Param('leadid') id:number , @Body() data:leadTeachingStatusDto){
    return this.employeeService.updateLeadTeachingStatus(id,data)

}




}