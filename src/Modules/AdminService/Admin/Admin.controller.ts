import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AdminService } from "./Admin.service";
import { CreateEmployeeDto } from "../Dtos/createTeacher.dto";




@Controller('/admin')
export class AdminController{


constructor(private readonly adminService:AdminService){}



@Get('/employee')

async listOfEmployee(){

this.adminService.fetchEmployee()



}


@Get('/employee/:id')

async fetchIndividulEmployee(@Param('id') id: number){

 return  this.adminService.fetchEmployeeByID(id)

}


@Post("/employee/create")
async createEmployee( @Body()  createEmployeeDto: CreateEmployeeDto){

 return  this.adminService.createEmployee(createEmployeeDto)
}



@Get('/employee/:id/teacher')
async listOfTeacherCreatedByEmployee(@Param('id') id:number){
    return this.adminService.fetchTeacherCreatedByEmployee(id)
}





}