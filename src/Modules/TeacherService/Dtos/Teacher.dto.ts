
import { Type } from 'class-transformer';
import {  IsArray, IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPhoneNumber, IsString, Length, MinLength, ValidateNested } from 'class-validator';
import { Gender } from 'src/Shared/Enums/enum';
import { AvailabilityDays } from 'src/TypeOrm/Entities/AvailabilityDay&Time/Availability.entities';








export class EducationQualificationDTO {
    @IsString()
    university: string;
  
    @IsString()
    degree: string; 
  
    @IsString()
    degreeType: string; 
  
    @IsString()
    specialization: string;
  
    @IsOptional()
    @IsNumber()
    startYear?: number;
  
    @IsOptional()
    @IsNumber()
    endYear?: number;
  }


  export class TeacherSubjectDto {
    @IsArray()
    @IsObject({ each: true }) 
    subjects: {
      subjectId: number;
      classId: number; 
    }[];
  }


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
    locality?: string;

    @IsNumber({}, { message: 'Latitude must be a valid number' })
    latitude: number;

    @IsNumber({}, { message: 'Longitude must be a valid number' })
    longitude: number;
}





export class TeacherProfileDTO{
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






}


export class FilterTeacherDTO{

  @IsOptional()
  @IsEnum(Gender)  
  gender?: Gender;

  @IsString()
  experience:string

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  subjectIds?: number[];  

  @IsOptional()
  @IsInt()
  class?: number;




}