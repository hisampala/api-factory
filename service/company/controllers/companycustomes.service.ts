import { generateMessageErrorPrismaClient, PrismaService } from '@factory/common';
import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Observable } from 'rxjs';
interface ICustomeService {
    getcount():Observable<number>
}
@Injectable()

export class CompanycustomesService implements ICustomeService {
    constructor(private context:PrismaService){}
    getcount(): Observable<number> {
       return new Observable((obs)=>{
        this.context.company.count().then((result) => {
            obs.next(result);
        }).catch((error: PrismaClientKnownRequestError) => {
            const isError = generateMessageErrorPrismaClient(error)
            obs.error(isError)
        })
       })
    }
}
