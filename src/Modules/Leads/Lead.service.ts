import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Lead, TeacherLeadActivity, TeacherLeadActivityLog,} from "src/TypeOrm/Entities/lead/lead.entities";
import { Repository } from "typeorm";
import { CloseLeadDto, CreateLeadDto,  leadDemoDto,  leadTeacherSelectionDto,  leadTeachingStatusDto,  RejectLeadDto, UpdateLeadPriceDto, UpdateTeacherLeadActivityDto } from "./Dtos/lead.dto";
import { ClassLevel, Subject } from "src/TypeOrm/Entities/Subject&Class/Subject.entities";
import { AvailabilityDays, AvailabilityTime } from "src/TypeOrm/Entities/AvailabilityDay&Time/Availability.entities";
import { TeacherProfile } from "../TeacherService/Entity/teacher.entities";
import { User } from "src/TypeOrm/Entities/User/User.entities";
import { Roles } from "src/TypeOrm/Entities/Role/role.entities";
import { ActivityType, LeadStatus, RoleType } from "src/Shared/Enums/enum";
import { TeacherService } from "../TeacherService/Teacher.service";
import { EmployeeDto } from "../AdminService/Dtos/createTeacher.dto";
import { Address } from "src/TypeOrm/Entities/Address/Address.entites";






@Injectable()
export class LeadService{

constructor(
@InjectRepository(User)
private readonly UserRepo:Repository<User>,

@InjectRepository(Roles)
private readonly RoleRepo:Repository<Roles>,

@InjectRepository(Address)
private readonly addressRepo:Repository<Address>,

@InjectRepository(Lead)
private readonly leadRepository: Repository<Lead>,

@InjectRepository(ClassLevel)
private readonly ClassLeveRepo: Repository<ClassLevel>,
@InjectRepository(Subject)
private readonly SubjectRepo: Repository<Subject>,
@InjectRepository(AvailabilityDays)
private readonly AvailabilityDaysRepo: Repository<AvailabilityDays>,

@InjectRepository(AvailabilityTime)
private readonly AvailabilityTimeRepo: Repository<AvailabilityTime>,

@InjectRepository(TeacherProfile)
private readonly TeacherProfileRepo: Repository<TeacherProfile>,

@InjectRepository(TeacherLeadActivity)
private readonly teacherLeadActivityRepository:Repository<TeacherLeadActivity>,

@Inject(forwardRef(() => TeacherService)) 
private readonly teacherService:TeacherService,

@InjectRepository(TeacherLeadActivityLog)
private readonly teacherLeadActivityLogsRepository:Repository<TeacherLeadActivityLog>,



){}


async createLead(createLeadDto: CreateLeadDto,employee:EmployeeDto){


  const { 
    name, 
    email, 
    phone, 
    whatsappnumber,
    genderPreference, 
    budget, 
    classlevel,
    subjects, 
    days, 
    times,
    address
  } = createLeadDto;

  const [first,last]=name.split(" ")

  let user = await this.UserRepo.findOne({ where: { phone_number:phone} });
  const studentRole = await this.RoleRepo.findOne({ where: { role_name: RoleType.student } })
  console.log(studentRole,"jheee")


  if (!user) {

    const user=new User()

    user.first_name=first
    user.last_name=last
    user.email=email
    user.phone_number=phone
    user.whatsapp_number=whatsappnumber
    user.role=studentRole

    

    await this.UserRepo.save(user);





  const lead = new Lead();
    lead.name = name;
    lead.email = email;
    lead.phone = phone;
    lead.genderPreference = genderPreference;
    lead.budget = budget;
    lead.classlevel = classlevel;
    lead.handledByEmployeeId=employee
     

    const address=new Address()
    address.country = address.country || null;
    address.state = address.state;
    address.city = address.city;
    address.zip = address.zip;
    address.district = address.district || null;
    address.locality = address.locality || null;
    address.latitude = address.latitude;
    address.longitude = address.longitude;
   
    const savedaddress=await this.addressRepo.save(address)

    lead.address=savedaddress
    
    const subjectEntities = await this.SubjectRepo.findByIds(subjects); 
    if (subjectEntities.length !== subjects.length) {
      throw new Error("Some subjects not found");
    }
   
console.log(subjectEntities,"hshshshaksls;d;d;d;")

lead.subjects = subjectEntities


const dayEntities = await this.AvailabilityDaysRepo.findByIds(days); 
if (dayEntities.length !== days.length) {
  throw new Error("Some days not found");
}
console.log(dayEntities,"hdhshhshsh")


lead.days = dayEntities;





const timeEntities = await this.AvailabilityTimeRepo.findByIds(times); 
if (timeEntities.length !== times.length) {
  throw new Error("Some times not found");
}


console.log(timeEntities,"jsjjdsjjd")
lead.times = timeEntities;

lead.student = user;
  
return await this.leadRepository.save(lead);


// }

// async assignTeacherToLead(teacherId: number, leadId: number) {

//   const teacher = await this.TeacherProfileRepo.findOne(  { where: { id: teacherId } });
//   const lead = await this.leadRepository.findOne( { where: { id:leadId } });

//   const teacherLeadActivity = new TeacherLeadActivity();
//   teacherLeadActivity.teacher = teacher;
//   teacherLeadActivity.lead = lead;


//   await this.TeacherLeadActivityRepo.save(teacherLeadActivity);


}









}


async searchLead(phone:string){
    const lead = await this.leadRepository.findOne({ where: { phone:phone} });

    
    if (!lead) {
      throw new Error('Lead not found');
    }

   
    return lead;
}



async findOne(id:number){
    const lead = await this.leadRepository.findOne({ where: { id:id} });

  if (!lead) {
    throw new Error('Lead not found');
  }


  return lead;

}



async getIndividualStats(id:number){


  const lead = await this.leadRepository.findOne({ where: { id:id} });

  const teacherActivities = await this.teacherLeadActivityRepository.find({ 
    where: {
      lead: { id: id },
    },
  });

const selectedForDemo=teacherActivities.filter((activity)=>{
  return activity.activityType=ActivityType.SELECTED_FOR_DEMO
})

const DemoCompleted=teacherActivities.filter((activity)=>{
  return activity.activityType=ActivityType.COMPLETED_DEMO
})


const  purchaseLeadCount=teacherActivities.filter((activity)=>{
  return activity.isLeadPurchased=true
})



 


const teacherCount=teacherActivities.length



  let potentialRevenue=lead.lead_price*teacherCount

  const purchasePercentage =teacherCount > 0 ? (purchaseLeadCount.length /teacherCount) * 100 : 0;

  const purchaseLeft = 100 - purchasePercentage;

const currentRevenueGenrated=lead.revenueGenerated





return {
  leadId: id,
  leadName: lead.name, 
  leadPrice: lead.lead_price,
  teacherCount,
  purchaseLeadCount,
  potentialRevenue,
  purchasePercentage,
  purchaseLeft,
  currentRevenueGenrated
};
}

// async getStats() {


//     const today = this.dateService.getToday();
//     const lastWeek = this.dateService.getLastWeek();
//     const lastMonth = this.dateService.getLastMonth();
//     const yesterday = this.dateService.getYesterday();





//     const highestRevenueLeads = await this.revenueRepo.findHighestRevenueLeads();

   
//     const revenueGrowthRate = await this.revenueRepo.calculateGrowthRate(today, lastMonth);

//     // Query 3: Top 3 subjects generating the most leads
//     const topSubjects = await this.subjectRepo.findTopSubjects();

//     // Query 4: Leads added today, this week, and this month
//     const leadsToday = await this.leadRepo.countLeadsByDate(today);
//     const leadsThisWeek = await this.leadRepo.countLeadsByDateRange(lastWeek, today);
//     const leadsThisMonth = await this.leadRepo.countLeadsByDateRange(lastMonth, today);

//     // Query 5: Source generating the most leads
//     const topSource = await this.leadRepo.findTopLeadSources();

//     // Query 6: Percentage of leads converted into customers
//     const totalLeads = await this.leadRepo.countAllLeads();
//     const totalCustomers = await this.customerRepo.countAllCustomers();
//     const conversionRate = (totalCustomers / totalLeads) * 100;

//     // Query 7: Breakdown of leads by geographical region
//     const geographicalBreakdown = await this.geographicalRepo.getLeadGeographicalBreakdown();

//     // Query 8: Locations generating the highest number of leads
//     const topLocations = await this.geographicalRepo.getTopLocationsByLeads();

//     // Query 9: Time taken to respond to a lead
//     const averageResponseTime = await this.leadRepo.calculateAverageResponseTime();

//     // Query 10: Percentage of active leads
//     const activeLeads = await this.leadRepo.countActiveLeads();
//     const activeLeadPercentage = (activeLeads / totalLeads) * 100;

//     // Query 11: Percentage of leads added compared to yesterday
//     const leadsYesterday = await this.leadRepo.countLeadsByDate(yesterday);
//     const leadsAddedTodayPercentage = (leadsToday / leadsYesterday) * 100;

//     // Aggregating all the stats
//     return {
//       highestRevenueLeads,
//       revenueGrowthRate,
//       topSubjects,
//       leadsToday,
//       leadsThisWeek,
//       leadsThisMonth,
//       topSource,
//       conversionRate,
//       geographicalBreakdown,
//       topLocations,
//       averageResponseTime,
//       activeLeadPercentage,
//       leadsAddedTodayPercentage,
//     };
//   }

  async findHighestRevenueLeads() {
    return await this.leadRepository.find({
      order: { revenueGenerated: 'DESC' },
      take: 5,
    });
  }

  async countLeadsByDate(date: Date) {
    return await this.leadRepository.count({ where: { createdAt: date } });
  }

  async findTopLeadSources() {
    return await this.leadRepository
      .createQueryBuilder('lead')
      .select(['lead.lead_source', 'COUNT(lead.id) as leadCount'])
      .groupBy('lead.lead_source')
      .orderBy('leadCount', 'DESC')
      .getRawMany();
  }
  async countAllLeads() {
    return await this.leadRepository.count();
  }

  async getTopLocationsByLeads() {
    return await this.leadRepository
      .createQueryBuilder('lead')
      .select(['lead.address', 'COUNT(lead.id) as leadCount'])
      .groupBy('lead.address')
      .orderBy('leadCount', 'DESC')
      .getRawMany();
  }

  async countActiveLeads() {
    return await this.leadRepository.count({ where: {status: LeadStatus.IN_PROGRESS } });
  }

  async calculateLeadGrowthRate(today: Date, yesterday: Date): Promise<number> {
   
    const leadsToday = await this.leadRepository.count({
      where: {
        createdAt: today,
      },
    });
  
   
    const leadsYesterday = await this.leadRepository.count({
      where: {
        createdAt: yesterday,
      },
    });
  
  
    if (leadsYesterday === 0) {
      return leadsToday > 0 ? 100 : 0; 
    }
  
    
    const growthRate = ((leadsToday - leadsYesterday) / leadsYesterday) * 100;
    return growthRate;
  }


  async calculateConversionRate(): Promise<number> {
   
    const totalLeads = await this.leadRepository.count();
  
  
    const successfulLeads = await this.leadRepository.count({
      where: {
        isLeadClosed: true,
      },
    });
  
    
    if (totalLeads === 0) {
      return 0;
    }
  
   
    const conversionRate = (successfulLeads / totalLeads) * 100;
    return conversionRate;
  }


async getIndividualLeadDemo(id:number){


    const demoCount = await this.teacherLeadActivityRepository.find({
        where: {
          lead: {id},         
          activityType: 'SelectedForDemo', 
        },
      });




}


async getIndividualLeadPurchase(id:number){


    const demoCount = await this.teacherLeadActivityRepository.find({
        where: {
          lead: {id},         
          isLeadPurchased: true, 
        },
      });




}



async TeacherAssignedToLead(id:number){

  const teacherDetail = await this.teacherLeadActivityRepository.find({
        where: {
          lead: {id},         
          
        },
        relations: ['teacher'],
      });


}

async studentGeneratedLead(id:number){
  
  const lead = await this.leadRepository.findOne({ where: { id:id} 
  ,
  relations: ['student'],
  });

  if (!lead) {
    throw new Error('Lead not found');
  }


  return lead;


}



async leadAssignedToIndividualTeacher(teacherId: number) {
  return await this.teacherLeadActivityRepository.find({
    where: { teacher: { id: teacherId } },
    relations: ['teacher' , 'lead'], 
  });
}



async LeadByEmployeeId(employeeId:number){

  return await this.leadRepository.find({
    where: { handledByEmployeeId: { id: employeeId } },
    
  });

}





async updateLeadDemoAssignment(leadId:number,  data:leadDemoDto){

  const activity = await this.teacherLeadActivityRepository.findOne({  });

  if (!activity) {
    throw new NotFoundException(`Teacher Lead Activity with ID  not found`);
  }
  activity.demo_date=data.demo_date
  activity.activityType=ActivityType.SELECTED_FOR_DEMO

  await this.teacherLeadActivityRepository.save(activity)


  const teacher=await this.teacherService.fetchIndividualTeacher(data.teacherId)
const log=new TeacherLeadActivityLog()
const logMessage = `Teacher ${teacher.user.first_name} ${teacher.user.last_name} has been assigned for a demo on ${activity.demo_date.toLocaleDateString()}.`;

log.teacher_lead_activity = activity; 
log.message = logMessage;
await this.teacherLeadActivityLogsRepository.save(log);

}

async updateLeadTeacherSelection(leadId:number,  data:leadTeacherSelectionDto){
  const activity = await this.teacherLeadActivityRepository.findOne({  });

  if (!activity) {
    throw new NotFoundException(`Teacher Lead Activity with ID  not found`);
  }
  activity.isTeacherSelected=true
  activity.teaching_start_time=data.teaching_start_time
  activity.teaching_end_time=data.teaching_end_time

  await this.teacherLeadActivityRepository.save(activity)

  const teacher=await this.teacherService.fetchIndividualTeacher(data.teacherId)
const log=new TeacherLeadActivityLog()
const logMessage = `Teacher ${teacher.user.first_name} ${teacher.user.last_name} has been selected for a classes  timing are -${data.teaching_start_time } - ${data.teaching_end_time}.`;

log.teacher_lead_activity = activity; 
log.message = logMessage;
await this.teacherLeadActivityLogsRepository.save(log);
}

async updateLeadTeachingStatus(leadId:number,  data:leadTeachingStatusDto){

  const activity = await this.teacherLeadActivityRepository.findOne({  });

  if (!activity) {
    throw new NotFoundException(`Teacher Lead Activity with ID  not found`);
  }

  activity.is_teaching_started=true
activity.activityType=ActivityType.TEACHING

await this.teacherLeadActivityRepository.save(activity)

const lead=await this.leadRepository.findOne({where:{id:leadId}});

const teacher=await this.teacherService.fetchIndividualTeacher(data.teacherId)

 lead.selectedTutor=teacher



 lead.status=LeadStatus.SUCCESS
await this.leadRepository.save(lead)
 
}

async closeLead(id:number, closeLeadDto:CloseLeadDto){

  const lead = await this.leadRepository.findOne({ where: { id:id} });

  if (!lead) {
    throw new Error('Lead not found');
  }


    lead.status=closeLeadDto.status
   lead.rejectionReason=closeLeadDto.reason
   lead.isLeadClosed=true

    await this.leadRepository.save(lead);
    return lead;

}



async getLeadActivityLogs(leadId: number) {
  const leadActivities = await this.teacherLeadActivityRepository.find({
    where: { lead: { id: leadId } },
    relations: ['logs'],  
  });

  return leadActivities

}









}
















