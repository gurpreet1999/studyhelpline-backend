import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateEmployeeDto } from "../Dtos/createTeacher.dto";
import { User } from "src/TypeOrm/Entities/User/User.entities";
import { Like, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { EmployeeProfile } from "../Entity/employee.entities";
import * as fs from 'fs';
import * as path from 'path';
import { LeadStatus } from "src/Shared/Enums/enum";
import { EmployeeService } from "../Employee/Employee.service";



@Injectable()

export class AdminService{

    constructor(
@InjectRepository(User)
private readonly userRepo:Repository<User>,

@InjectRepository(EmployeeProfile)
private readonly EmployeRepo:Repository<EmployeeProfile>,

private readonly employeeService:EmployeeService
    ){

    }

    

    async fetchEmployee() {
        try {
         
          const employees = await this.EmployeRepo.find({
            relations: ['user'], 
          });
    
     
          if (!employees || employees.length === 0) {
            throw new NotFoundException('No employees found.');
          }
    
          return employees;
        } catch (error) {
          throw new Error('Error fetching employees: ' + error.message);
        }
      }
    

    
      async fetchEmployeeByID(id: number) {
        return this.employeeService.findEmployeeById(id)
      }



     async createEmployee(createEmployeeDto:CreateEmployeeDto){
     const {
        first_name,
        last_name,
        email,
        phone_number,
        whatsapp_number,
        gender,
        password,
        adhaar_no,
        adhaar_photo,
        designation,
        joining_date
      } = createEmployeeDto;



      if(password){


      }

const user=new User()

user.first_name=first_name
user.last_name=last_name
user.gender=gender
user.email=email
user.phone_number=phone_number
user.whatsapp_number=whatsapp_number
user.password=password


const savedUser = await this.userRepo.save(user);


const employee=new EmployeeProfile()
employee.adhaar_no=adhaar_no
employee.designation=designation
employee.joining_date=joining_date
employee.adhaar_photo=adhaar_photo

employee.user = savedUser



const savedEmployeeProfile = await this.EmployeRepo.save(employee);


const fileContent = `emailId: ${email}\nPassword: ${password}\n\nPlease share this with the employee securely.`;
const fileName = `${email}_credentials.txt`;
const filePath = path.join(__dirname, 'uploads', fileName);

if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
    fs.mkdirSync(path.join(__dirname, 'uploads'));
  }

fs.writeFileSync(filePath, fileContent);

console.log(`Credentials file generated at: ${filePath}`);

return {
    message: 'Employee created successfully.',
    user: savedUser,
    employee: savedEmployeeProfile,
    credentialsFilePath: `/uploads/${fileName}`,
  };

   }


   async fetchLeadsByEmployee(id: number) {

    this.employeeService.AllLeadByEmployee(id)
   
  }

   async fetchTeacherCreatedByEmployee(id: number) {
      return this.employeeService.teacherCreatedByEmployeeId(id)
  }


  async fetchEmployeeStats(id: number) {

    const employee = await this.EmployeRepo.findOne({
        where: { id },
        relations: ['handledLeads', 'teacher_verified'], 
      });
      

      if (!employee) {
        throw new NotFoundException(`Employee with ID ${id} not found.`);
      }

      const activeLeadStatuses = [
        LeadStatus.IN_PROGRESS,
        LeadStatus.CONTACTED,
        LeadStatus.MATCHED,
      ];
  
      const activeLeads = employee.handledLeads.filter(lead =>
        activeLeadStatuses.includes(lead.status)
      ).length;
      

      const stats = {
        employeeId: employee.id,
        totalLeadsHandled: employee.handledLeads.length,
        followingup: activeLeads,
        followupcompleted:employee.handledLeads.length-activeLeads,
        totalTeachersVerified: employee.teacher_verified.length,
      };
      return stats



  }


  async  getFailedAndCancelledLeads(employeeId: number) {

    const employee = await this.EmployeRepo.findOne({
        where: { id: employeeId },
        relations: ['handledLeads'], 
      });
    
      if (!employee) {
        throw new Error('Employee not found');
      }
    
     
      const failedLeads = employee.handledLeads.filter(
        (lead) => lead.status === LeadStatus.FAILED
      );
    
      const cancelledLeads = employee.handledLeads.filter(
        (lead) => lead.status === LeadStatus.CANCELLED
      );
    
     
      const combinedLeads = [...failedLeads, ...cancelledLeads];

  }



  async searchEmployee(searchTerm: string){

    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    const searchResults = await this.userRepo.find({
        where: [
          { first_name: Like(`%${normalizedSearchTerm}%`) },
          { last_name: Like(`%${normalizedSearchTerm}%`) },
          { email: Like(`%${normalizedSearchTerm}%`) },
          { phone_number: Like(`%${normalizedSearchTerm}%`) },
        ],
        relations: ['employeeProfile'],
      });


      return searchResults

  }





    
}