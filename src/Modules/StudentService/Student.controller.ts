import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { StudentService } from "./Student.service";
import { studentChatboxQueryDto, StudentQueryDto } from "./Dtos/Dtos";

@Controller('student')
export class StudentController{

constructor(private readonly studentService:StudentService ) {}




@Post('/query')
async studentQuery(@Body() body:StudentQueryDto){


    const res=this.studentService.createStudentQuery(body)





}


@Get('/request-callback')

async requestAcallback(@Request() req: any){

    const studentId = req.user?.studentId;

    if (!studentId) {
       
        throw new Error('Student ID not found');
    }


    this.studentService.createCallbackQuery(studentId)


}


@Post('/create-message')
async StudentChatboxMessage(@Body() body:studentChatboxQueryDto){

this.studentService.studentChatboxQuery(body)


}






}