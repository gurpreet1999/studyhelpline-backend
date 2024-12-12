import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvailabilityDays, AvailabilityTime } from './Entities/AvailabilityDay&Time/Availability.entities';
import { ClassLevel, Subject } from './Entities/Subject&Class/Subject.entities';


@Injectable()
export class FrontendDataService {
    constructor(
        @InjectRepository(AvailabilityTime)
        private timeSlotRepository: Repository<AvailabilityTime>,
        @InjectRepository(ClassLevel)
        private classLevelRepository: Repository<ClassLevel>,
        @InjectRepository(Subject)
        private subjectRepository: Repository<Subject>,
        @InjectRepository(AvailabilityDays)
        private daysRepository: Repository<AvailabilityDays>,) {}

    async getAllTimeSlots() {
        return this.timeSlotRepository.find();
    }

    async getAllClassLevels(){
        return this.classLevelRepository.find();
    }


    async getAllSubjectsList(){
        return this.subjectRepository.find();
    }


  async getAllDays(){
    return this.daysRepository.find();
  }
  
}
