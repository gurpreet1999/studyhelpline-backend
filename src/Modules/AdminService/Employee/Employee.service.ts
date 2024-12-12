import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { Address } from 'src/TypeOrm/Entities/Address/Address.entites';

import { TeacherAvailabilityTime, TeacherCertification, TeacherEducationQualification, TeacherClassSubject } from 'src/Modules/TeacherService/Entity/teacher.entities';

import { User } from 'src/TypeOrm/Entities/User/User.entities';
import { TeacherCreatedByEmployeeDto } from '../Dtos/createTeacher.dto';
import { TeacherService } from 'src/Modules/TeacherService/Teacher.service';
import { LeadService } from 'src/Modules/Leads/Lead.service';
import { CreateLeadDto, UpdateTeacherLeadActivityDto } from 'src/Modules/Leads/Dtos/lead.dto';
import { EmployeeProfile } from '../Entity/employee.entities';



@Injectable()
export class EmployeeService {


    constructor(
     
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
        @InjectRepository(TeacherCertification)
        private readonly teacherCertification: Repository<TeacherCertification>,
        @InjectRepository(TeacherEducationQualification)
        private readonly teacherEducationQualification: Repository<TeacherEducationQualification>,
        @InjectRepository(TeacherClassSubject)
        private readonly teachingDetail: Repository<TeacherClassSubject>,
        @InjectRepository(TeacherAvailabilityTime)
        private readonly teacherAvailabilityTime: Repository<TeacherAvailabilityTime>,

        private readonly teacherService:TeacherService,

        private readonly leadService:LeadService,

        @InjectRepository(EmployeeProfile)
        private readonly employeeProfilerRepo:Repository<EmployeeProfile>
   
    ) {}



    async createTeacher(teacher: TeacherCreatedByEmployeeDto) {
 

              


   return  this.teacherService.createTeacherByEmployee(teacher)

      }

      

    async teacherCreatedByEmployeeId(id:number){
         


      try {
        const teacher = await this.employeeProfilerRepo.findOne({
          where: { id },
          relations: ['teacher_verified','teacher_verified.user'], 
        });
  
        
  
        return  teacher 
      } catch (error) {
        throw new Error('Error fetching teacher count: ' + error.message);
      }

      // this.teacherService.getTeachersCreatedByEmployee(id)

      }



      async createLead(lead:CreateLeadDto, id:number){


const employee=await this.findEmployeeById(id)

this.leadService.createLead(lead,employee)

       }


     async leadById(id:number){
      this.leadService.findOne(id)
      }

      async AllLeadByEmployee(employeeId:number){

        try {
          const employee = await this.employeeProfilerRepo.findOne({
            where: { id:employeeId },
            relations: ['handledLeads'], 
          });
    
          if (!employee) {
            throw new NotFoundException(`Employee with ID ${employeeId} not found.`);
          }
    
         
          return employee.handledLeads; 
        } catch (error) {
          throw new Error('Error fetching leads: ' + error.message);
        }

     }


async findEmployeeById(id:number){

  try {
       
    const employee = await this.employeeProfilerRepo.findOne({
      where: { id },
      relations: ['user'], 
    });

  
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found.`);
    }

    return employee;
  } catch (error) {
    throw new Error('Error fetching employee by ID: ' + error.message);
  }
}


async updateLead(updateLead:UpdateTeacherLeadActivityDto){


}

  async sendOtp(emailAddress:string){

  

  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}