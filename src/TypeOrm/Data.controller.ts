import { Controller, Get, Param } from '@nestjs/common';

import { FrontendDataService } from './Data.service';


@Controller('')
export class FrontendDataController {
    constructor(private readonly frontendDataService: FrontendDataService) {}

    @Get('time-slots')
    async getAllTimeSlots(){
        return this.frontendDataService.getAllTimeSlots();
    }

    @Get('class-levels')
    async getAllClassLevels() {
        return this.frontendDataService.getAllClassLevels();
    }

    @Get('days')
    async getDays() {
        return this.frontendDataService.getAllDays();
    }

    @Get('subjects')
    async getSubjects(){
        return this.frontendDataService.getAllSubjectsList();
    }
}
