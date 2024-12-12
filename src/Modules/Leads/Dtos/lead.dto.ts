import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsEnum, IsArray, IsString, IsNumber, IsOptional, IsPhoneNumber, Length, IsInt, ValidateNested, IsDateString, IsBoolean } from 'class-validator';
import { ActivityType, GenderPreference, LeadStatus, Priority } from 'src/Shared/Enums/enum';
import { In } from 'typeorm';




export class AddressDTO {
 

  @IsString()
  @IsOptional()
  address_line_1?: string; 


  @IsString()
  @IsOptional()
  country?: string; 

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  @Length(5, 10, { message: 'Zip code must be between 5 and 10 characters' }) 
  zip: string;

  @IsString()
  @IsOptional()
  district?: string; 

  @IsString()
  @IsOptional()
  landmark?: string;

  @IsNumber({}, { message: 'Latitude must be a valid number' })
  latitude: number;

  @IsNumber({}, { message: 'Longitude must be a valid number' })
  longitude: number;



}


export class DayDto{

  @IsInt()
  @IsNotEmpty()
  dayId:number


}



export class timeDto{
  @IsInt()
  @IsNotEmpty()
  timeId:number
}









export class SubjectDto {
@IsInt()
@IsNotEmpty()
subjectId: number;
}




export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsPhoneNumber()
  whatsappnumber:string

  @IsEnum(GenderPreference)
  genderPreference: GenderPreference;

  @IsString()
  @IsNotEmpty()
  budget: string;


@IsNotEmpty()
@ValidateNested()
@Type(()=>AddressDTO)
address:AddressDTO

  
  @IsString()
  @IsNotEmpty()
  classlevel: string;

  @IsArray()
  @IsNotEmpty()
  subjects:number[]

  @IsArray()
  @IsNotEmpty()
  days:number[];

   


  @IsArray()
  @IsNotEmpty()
  times:number[];





}


export class updateLeadDto{



}





export class UpdateTeacherLeadActivityDto {

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value ? new Date(value) : null)
  demo_date?: Date; 

  @IsOptional()
  @IsString()
  teaching_start_time?: string; 

  @IsOptional()
  @IsString()
  teaching_end_time?: string; 

  @IsOptional()
  @IsString()
  student_feedback?: string; 

  @IsOptional()
  @IsBoolean()
  isDemoAttended?: boolean; 

  @IsOptional()
  @IsBoolean()
  isTeacherSelected?: boolean; 

  @IsOptional()
  @IsString()
  notes?: string; 

  @IsOptional()
  @IsBoolean()
  isLeadPurchased?: boolean; 

  @IsOptional()
  @IsString()
  employeeFollowUp?: string; 

  @IsOptional()
  @IsNumber()
  feesFinalized?: number; 

  @IsOptional()
  @IsString()
  teacherRemarks?: string;

  @IsOptional()
  @IsBoolean()
  refundDemanded?: boolean; 

  @IsOptional()
  @IsString()
  refundDemandedReason?: string; 


@IsOptional()
@IsBoolean()
is_teaching_started:boolean


}


export class RejectLeadDto{

  @IsString()
  @IsNotEmpty()
   rejection_reason:string

}

export class UpdateLeadPriceDto {
  @IsNumber()
  price: number;  

}





  export class CloseLeadDto {
    @IsEnum(LeadStatus)
    status: LeadStatus;
  
     @IsString()
     @IsNotEmpty()
     reason:string

  }







export class LeadFilterDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsNumber()
  teacherId?: number;

  @IsOptional()
  @IsString()
  budget?: string;

  @IsOptional()
  @IsBoolean()
  isLeadClosed?: boolean;

  @IsOptional()
  @IsString()
  feedback?: string;
}