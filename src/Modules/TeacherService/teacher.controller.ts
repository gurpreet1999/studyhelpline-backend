import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { TeacherService } from "./Teacher.service";
import { AddressDTO, EducationQualificationDTO, FilterTeacherDTO, TeacherProfileDTO, TeacherSubjectDto, } from "./Dtos/Teacher.dto";

import { Request } from "express";





@Controller('teacher')

export class TeacherController{

constructor(
    private readonly teacherService:TeacherService
){}




@Post()
async createTeacherProfile(teacher:TeacherProfileDTO){

    this.teacherService.createTeacher(teacher)

}


@Post('/qualification')
async teacherQualification(){

}


@Post('/subject')
async teacherSubject(teacherid:number,subject:TeacherSubjectDto){

    this.teacherService.TeacherSubject(teacherid,subject)

}

@Post('/address')
async teacherAddress(teacherId: number,address:AddressDTO){
 this.teacherService.updateteacherAddress(teacherId,address)


}


@Get('/filter')
async filterTeacher(filterParam:FilterTeacherDTO){

this.teacherService.filterTeacher(filterParam)

}


@Get('stats')
async getAllTeacherStats() {
  return this.teacherService.getAllTeacherStats();
}

@Get('/:id')
async individualTeacherDetail(id:number){

return this.teacherService.fetchIndividualTeacher(id)

}

@Get(':id/leads')
  async getTeacherLeads( teacherId: number) {
    return this.teacherService.individualTeacherLead(teacherId);
  }

@Get('verified-by-employee/:employeeId')
async getTeachersVerifiedByEmployee(employeeId: number) {
  return this.teacherService.teacherVerifiedByEmployee(employeeId);
}







}