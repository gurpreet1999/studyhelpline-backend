import { IsString, IsEmail, IsEnum, IsPhoneNumber, IsOptional, Length, IsArray, ArrayNotEmpty, ValidateNested, IsIn, Min, IsNumber, IsDecimal, IsNotEmpty, Matches, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { Gender } from 'src/Shared/Enums/enum';
import { EmployeeDesignation, EmployeeProfile } from '../Entity/employee.entities';




export class TeacherSubjectDto {
  @IsNumber({}, { message: 'Subject ID must be a valid number' })
  subjectId: number;

  @IsNumber({}, { message: 'Class ID must be a valid number' })
  classId: number;
}

export class AddressDTO {
  
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
  locality?: string;

  @IsNumber({}, { message: 'Latitude must be a valid number' })
  latitude: number;

  @IsNumber({}, { message: 'Longitude must be a valid number' })
  longitude: number;
}








export class TeacherCreatedByEmployeeDto{

  @IsString()
  @IsNotEmpty()
  first_name: string;
  
  @IsString()
  @IsNotEmpty()
  last_name: string;
  
  @IsEnum(Gender) 
  gender: Gender; 
  
  @IsPhoneNumber(null, { message: 'Phone number is invalid' })
  phone_number: string;
  
  @IsOptional()
  @IsPhoneNumber(null, { message: 'WhatsApp number is invalid' })
  whatsapp_number?: string;
  
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;
  
  @IsString()
  experience:string
  
  @IsString()
  @IsNotEmpty()
  age:string

 @ValidateNested()
 @Type(()=>AddressDTO)
 @IsNotEmpty({ message: 'Address is required' })
 address:AddressDTO  

@ValidateNested()
@IsArray()
@Type(()=>TeacherSubjectDto)
subject_class:TeacherSubjectDto[]


}


export class CreateEmployeeDto {
  
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{10}$/, { message: 'Phone number must be 10 digits.' })
  phone_number: string;

  @IsString()
  @IsOptional()
  @Matches(/^[0-9]{10}$/, { message: 'WhatsApp number must be 10 digits.' })
  whatsapp_number?: string;

  @IsEnum(Gender, { message: 'Gender must be one of the predefined values.' })
  @IsOptional()
  gender?: Gender;

  @IsString()
  @IsOptional()
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters.' })
  password?: string;

  @IsString()
  @IsNotEmpty()
  @Length(12, 12, { message: 'Aadhaar number must be exactly 12 characters.' })
  adhaar_no: string;

  @IsString()
  @IsNotEmpty()
  adhaar_photo: string;

  @IsEnum(EmployeeDesignation, { message: 'Designation must be one of the predefined values.' })
  @IsNotEmpty()
  designation: EmployeeDesignation;

  @IsDate()
  @IsNotEmpty()
  joining_date: Date;
}




export type EmployeeDto = Required<EmployeeProfile>; 