import { Injectable } from "@nestjs/common";
import { AddressDTO, EducationQualificationDTO, FilterTeacherDTO, TeacherProfileDTO, TeacherSubjectDto, } from "./Dtos/Teacher.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TeacherAvailabilityTime, TeacherCertification, TeacherClassSubject, TeacherEducationQualification, TeacherProfile, } from "./Entity/teacher.entities";
import { Repository } from "typeorm";

import { ClassLevel, Subject } from "src/TypeOrm/Entities/Subject&Class/Subject.entities";
import { AvailabilityDays, AvailabilityTime } from "src/TypeOrm/Entities/AvailabilityDay&Time/Availability.entities";

import { Address } from "src/TypeOrm/Entities/Address/Address.entites";
import { User } from "src/TypeOrm/Entities/User/User.entities";
import { LeadService } from "../Leads/Lead.service";
import { TeacherCreatedByEmployeeDto } from "../AdminService/Dtos/createTeacher.dto";



@Injectable()
export  class TeacherService{

constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
 
    @InjectRepository(TeacherProfile)
    private readonly TeacherProfileRepo:Repository<TeacherProfile>,
    @InjectRepository(User)
     private readonly UserRepo:Repository<User>,
    @InjectRepository(TeacherCertification)
    private readonly teacherCertification: Repository<TeacherCertification>,
    @InjectRepository(TeacherEducationQualification)
    private readonly teacherEducationQualification: Repository<TeacherEducationQualification>,
    @InjectRepository(TeacherClassSubject)
    private readonly teacherSubjectRepo: Repository<TeacherClassSubject>,
    @InjectRepository(TeacherAvailabilityTime)
    private readonly teacherAvailabilityTime: Repository<TeacherAvailabilityTime>,

    @InjectRepository(Subject)
    private readonly SubjectRepo: Repository<Subject>,
    @InjectRepository(ClassLevel)
    private readonly ClasslevelRepo: Repository<ClassLevel>,

    private readonly leadService: LeadService, 

){}





async createTeacher(teacherDTO:TeacherProfileDTO){

    const {
        first_name,
        last_name,
        gender,
        phone_number,
        whatsapp_number,
        email,
        experience,
        age
      } = teacherDTO;


      const user = new User();
      user.first_name = first_name;
      user.last_name = last_name;
      user.gender = gender;
      user.phone_number = phone_number;
      user.whatsapp_number = whatsapp_number || null; 
      user.email = email;


      const savedUser = await this.UserRepo.save(user);

      const teacherProfile = new TeacherProfile();
      teacherProfile.user = savedUser; 
      teacherProfile.year_of_experience = experience; 
      teacherProfile.age = age; 
      const savedTeacherProfile = await this.TeacherProfileRepo.save(teacherProfile);



      return {
        message: 'Teacher created successfully.',
        user: savedUser,
        teacherProfile: savedTeacherProfile,
      };

}



async updateteacherAddress(teacherId: number,addressDTO:AddressDTO){

    const teacher = await this.TeacherProfileRepo.findOne({
        where: { id: teacherId },
        relations: ['address'], 
      });


      if (!teacher) {
        throw new Error('Teacher not found');
      }
  
   
      const address = new Address();


    address.country = addressDTO.country;
    address.state = addressDTO.state;
    address.city = addressDTO.city;
    address.zip = addressDTO.zip;
    address.district = addressDTO.district;
    address.locality = addressDTO.locality;
    address.latitude = addressDTO.latitude;
    address.longitude = addressDTO.longitude;


    await this.addressRepository.save(address);

    teacher.address = address;


    await this.TeacherProfileRepo.save(teacher);


}


async TeacherSubject(
     teacherid:number,
    subject:TeacherSubjectDto){

    const { subjects } = subject;

    const teacher = await this.TeacherProfileRepo.findOne({
        where: { id: teacherid },
      });
  
      if (!teacher) {
        throw new Error('Teacher not found');
      }

      for (const subject of subjects) {
        const { subjectId, classId } = subject;

        const subjectEntity = await this.SubjectRepo.findOne({ where: { id: subjectId } });
        const classLevelEntity = await this.ClasslevelRepo.findOne({ where: { id: classId } });


        const teacherClassSubject = new TeacherClassSubject();
        teacherClassSubject.teacher = teacher;
        teacherClassSubject.subject = subjectEntity;
        teacherClassSubject.classLevel = classLevelEntity;

        await this.teacherSubjectRepo.save(teacherClassSubject);

      }



}



async filterTeacher(filterparam:FilterTeacherDTO){

    const queryBuilder = this.TeacherProfileRepo.createQueryBuilder('teacher');

    queryBuilder
    .leftJoinAndSelect('teacher.teachersubject', 'teachersubject')
    .leftJoinAndSelect('teachersubject.subject', 'subject')
    .leftJoinAndSelect('teachersubject.classLevel', 'classLevel');

    if (filterparam.gender) {
        queryBuilder.andWhere('teacher.user.gender = :gender', { gender: filterparam.gender });
      }

 if (filterparam.experience) {
    queryBuilder.andWhere('teacher.year_of_experience >= :experience', { experience: parseInt(filterparam.experience) });
  }

if (filterparam.class) {
    queryBuilder.andWhere('classLevel.minClass <= :class AND classLevel.maxClass >= :class', { class: filterparam.class });
  }

  if (filterparam.subjectIds && filterparam.subjectIds.length > 0) {
    queryBuilder.andWhere('subject.id IN (:...subjectIds)', { subjectIds: filterparam.subjectIds });
  }


  const teachers = await queryBuilder.getMany();
  return teachers
}




async fetchIndividualTeacher(teacherId: number) {
    const teacher = await this.TeacherProfileRepo.findOne({
      where: { id: teacherId },
      relations: [
        'user', 
        'address', 
        'teachersubject', 
        'teachersubject.subject', 
        'teachersubject.classLevel',
        'educationQualifications', 
        'verifiedByEmployeeId',
      ],
    });
  
    if (!teacher) {
      throw new Error(`Teacher with ID ${teacherId} not found`);
    }
  
    return teacher;
  }


  async getAllTeacherStats() {




  }


  async getIndividualTeacherStats(teacherId: number) {

        

  }


  async unverifiedTeacher() {
    return await this.TeacherProfileRepo.find({
      where: {
        isVerified_By_Studyhelpline: false,
      },
      relations: ['user', 'address', 'teachersubject', 'educationQualifications'], 
    });
  }


async teacherVerifiedByEmployee(employeeId:number){




    return await this.TeacherProfileRepo.find({
        where: {
            verifiedByEmployeeId: { id: employeeId }, 
          },
        relations: ['user', 'address', 'teachersubject', 'educationQualifications'], 
      });

}


async individualTeacherLead(teacherId:number){


    return this.leadService.leadAssignedToIndividualTeacher(teacherId);

}



async createTeacherByEmployee(teacherDTO: TeacherCreatedByEmployeeDto) {
  const {
    first_name,
    last_name,
    gender,
    phone_number,
    whatsapp_number,
    email,
    experience,
    age,
    address,
    subject_class,
  } = teacherDTO;


  const user = new User();
  user.first_name = first_name;
  user.last_name = last_name;
  user.gender = gender;
  user.phone_number = phone_number;
  user.whatsapp_number = whatsapp_number || null;
  user.email = email;

  const savedUser = await this.UserRepo.save(user);


  const teacherProfile = new TeacherProfile();
  teacherProfile.user = savedUser;
  teacherProfile.year_of_experience = experience;
  teacherProfile.age = age;
  teacherProfile.verifiedAt=new Date()

  const savedTeacherProfile = await this.TeacherProfileRepo.save(teacherProfile);


  const teacherAddress = new Address();
 
  teacherAddress.country = address.country || null;
  teacherAddress.state = address.state;
  teacherAddress.city = address.city;
  teacherAddress.zip = address.zip;
  teacherAddress.district = address.district || null;
  teacherAddress.locality = address.locality || null;
  teacherAddress.latitude = address.latitude;
  teacherAddress.longitude = address.longitude;

  const savedAddress = await this.addressRepository.save(teacherAddress);


  savedTeacherProfile.address = savedAddress;
  await this.TeacherProfileRepo.save(savedTeacherProfile);


  for (const subject of subject_class) {
    const { subjectId, classId } = subject;

    const subjectEntity = await this.SubjectRepo.findOne({ where: { id: subjectId } });
    if (!subjectEntity) {
      throw new Error(`Subject with ID ${subjectId} not found`);
    }

    const classLevelEntity = await this.ClasslevelRepo.findOne({ where: { id: classId } });
    if (!classLevelEntity) {
      throw new Error(`Class level with ID ${classId} not found`);
    }

    const teacherClassSubject = new TeacherClassSubject();
    teacherClassSubject.teacher = savedTeacherProfile;
    teacherClassSubject.subject = subjectEntity;
    teacherClassSubject.classLevel = classLevelEntity;

    await this.teacherSubjectRepo.save(teacherClassSubject);
  }


  
  return {
    message: 'Teacher created successfully.',
    user: savedUser,
    teacherProfile: savedTeacherProfile,
    address: savedAddress,
    subjects: subject_class,
  };


}

async getTeachersCreatedByEmployee(id){

  const teachers = await this.TeacherProfileRepo.findOne({
    where: { verifiedByEmployeeId:id },

  })

  return teachers



}






}