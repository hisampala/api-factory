import { EventSubjectCompany, IBaseController } from '@factory/common';
import { Search } from '@factory/common/models';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Company } from '@prisma/client';
import { Observable } from 'rxjs';
import { CompanyService } from './company.service';
import { CompanycustomesService } from './companycustomes.service';

@Controller()
export class ComapnyController implements IBaseController {
    logger = new Logger(ComapnyController.name)
    constructor(
        private service: CompanyService,
        private cusService:CompanycustomesService
        ) { }
    @EventPattern(EventSubjectCompany.CREATECOMPANY)
    onCreate(@Payload() payload: Company): Observable<Company> {
        this.logger.log(EventSubjectCompany.CREATECOMPANY)
        return this.service.onCreate(payload)
    }
    @EventPattern(EventSubjectCompany.UPDATECOMPANY)
    onUpdate(@Payload() payload: Company): Observable<Company> {
        return this.service.onUpdate(payload.id, payload)
    }
    @EventPattern(EventSubjectCompany.DELETECOMPANY)
    onDelete(@Payload() payload: string): Observable<boolean> {
        return this.service.onDelete(payload)
    }
    @EventPattern(EventSubjectCompany.GETCOMPANY)
    getAll(@Payload() payload: Search<Company>): Observable<Company[]> {
        try {
            return this.service.getAll(payload)
        } catch (error) {
            console.log(error);
            
        }
        
    }
    @EventPattern(EventSubjectCompany.GETCOMPANYBYID)
    getById(@Payload() payload: string): Observable<Company> {
        return this.service.getById(payload)
    }
    @EventPattern(EventSubjectCompany.GETCOUNTCOMPANY)
    getCount(@Payload() payload: string): Observable<number> {
        return this.cusService.getcount()
    }
}
