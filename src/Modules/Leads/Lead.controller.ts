import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { LeadService } from "./Lead.service";
import {  CreateLeadDto, RejectLeadDto,  UpdateLeadPriceDto,  UpdateTeacherLeadActivityDto } from "./Dtos/lead.dto";

@Controller("lead")
export class LeadController{

constructor(private readonly leadService:LeadService){

}


// @Get()
// async getAllLeads() {
//   return this.leadService.findAll();
// }


// @Get(':id')
// async getLeadById(@Param('id') id: number) {
//   return this.leadService.findOneById(id);
// }


// @Post()
// async createLead(@Body() createLeadDto: CreateLeadDto) {
//   return this.leadService.createLead(createLeadDto);
// }


@Get()
async searchLead(@Body() phone:string){
return this.leadService.searchLead(phone)
}



@Get(':id')
async LeadDetail(@Param('id') id: number){

return this.leadService.findOne(id)

}



@Get(':id/stats')
async IndividualLeadStats(@Param('id') id: number){

  return this.leadService.getIndividualStats( id)
}



@Get(":id/demo-assigned")
async IndividualLeadDemo(@Param('id') id: number){

  return this.leadService.getIndividualLeadDemo( id)

}


@Get(":id/purchase")
async IndividualLeadPurchase(@Param('id') id: number){

  return this.leadService.getIndividualLeadPurchase( id)

}




// @Put(':id')
// async updateLead(@Param('id') id: number, @Body() updateLeadDto: UpdateLeadDto) {
//   return this.leadService.update(id, updateLeadDto);
// }




// @Delete(':id')
// async deleteLead(@Param('id') id: number) {
//   return this.leadService.remove(id);
// }




// @Post(':id/assign-teacher')
// async assignTeacher(@Param('id') id: number, @Body() assignTeacherDto: AssignTeacherDto) {
//   return this.leadService.assignTeacherToLead(id, assignTeacherDto);
// }




// @Post(':id/feedback')
// async addOrUpdateFeedback(@Param('id') id: number, @Body() updateFeedbackDto: UpdateFeedbackDto) {
//   return this.leadService.addOrUpdateFeedback(id, updateFeedbackDto);
// }


// @Patch(':id/close')
//   async rejectLead(
//     @Param('id') id: number,
//     @Body() rejectLeadDto: RejectLeadDto,
//   ) {
//     return this.leadService.rejectAndCloseLead(id, rejectLeadDto);
//   }


//   @Put()
//   updateLeadPriorities() {
//     return this.leadService.updateLeadPriorities();
//   }




// @Patch(':id/price')
// async leadPrice(
//   @Param('id') id: number, 
//   @Body() updateLeadPriceDto: UpdateLeadPriceDto, 
// ) {
//   return this.leadService.updateLeadPrice(id, updateLeadPriceDto); 
// }



//   @Get('teacher-assigned')
//   async TeacherAssignToLead() {
//     return this.leadService.allTeacherAssigned();
//   }

 
//   @Get('teacher-assigned:id')
//   async getTeacherLeadActivityById(@Param('id') id: number) {
//     return this.leadService.teacherLeadActivity(id);
//   }



//   @Put('teacher-assigned:id')
//   async updateTeacherLeadActivity(
//     @Param('id') id: number,
//     @Body() updateTeacherLeadActivityDto: UpdateTeacherLeadActivityDto
//   ) {
//     return this.leadService.updateTeacherLeadActivity(id, updateTeacherLeadActivityDto);
//   }



}

