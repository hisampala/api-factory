import { generateMessageErrorPrismaClient, IBaseService, isNullObj, PrismaService } from '@factory/common';
import { Search } from '@factory/common/models';
import { Injectable } from '@nestjs/common';
import { Company } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { Observable } from 'rxjs';

@Injectable()
export class CompanyService implements IBaseService {
    constructor(private context: PrismaService) { }
    onCreate(item: Company): Observable<Company> {
        return new Observable((obs) => {
            this.context.$transaction(async (tx) => {
                return tx.company.create({ data: item })
            }).then((result) => {
                obs.next(result);
            }).catch((error: PrismaClientKnownRequestError) => {
                const isError = generateMessageErrorPrismaClient(error)
                obs.error(isError)
            })
        })
    }
    onUpdate(id: string, item: Company): Observable<Company> {
        return new Observable((obs) => {
            this.context.$transaction(async (tx) => {
                delete item.id
                return tx.company.update({ where: { id: id }, data: item })
            }).then((result) => {
                obs.next(result);
            }).catch((error: PrismaClientKnownRequestError) => {
                const isError = generateMessageErrorPrismaClient(error)
                obs.error(isError)
            })
        })
    }
    onDelete(id: string): Observable<boolean> {
        return new Observable((obs) => {
            this.context.$transaction(async (tx) => {
                return tx.company.delete({ where: { id: id } })
            }).then((result) => {
                obs.next(!isNullObj(result));
            }).catch((error: PrismaClientKnownRequestError) => {
                const isError = generateMessageErrorPrismaClient(error)
                obs.error(isError)
            })
        })
    }
    getAll(item: Search<Company>): Observable<Company[]> {
        return new Observable((obs) => {
            this.context.company.findMany(item).then((result) => {
                obs.next(result);
            }).catch((error: PrismaClientKnownRequestError) => {
                const isError = generateMessageErrorPrismaClient(error)
                obs.error(isError)
            })
        })
    }
    getById(id: string): Observable<Company> {
        return new Observable((obs) => {
            this.context.company.findFirst({ where: { id: id } }).then((result) => {
                obs.next(result);
            }).catch((error: PrismaClientKnownRequestError) => {
                const isError = generateMessageErrorPrismaClient(error)
                obs.error(isError)
            })
        })
    }

}
