import {
    CompanyMicroserviceService,
    EventSubjectCompany,
    isNullObj,
    ResponseResult,
    Search,
} from '@factory/common';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Logger,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Company } from '@prisma/client';
import { get } from 'http';
import { CompanyService } from 'service/company/controllers/company.service';

@Controller('company')
export class CompanyController {
    constructor(
        @Inject(CompanyMicroserviceService.provide) private client: ClientProxy,
    ) { }
    @Post()
    async onCreate(@Body() item: Company) {
        return new Promise((resolve, reject) => {
            const sub = this.client.send(EventSubjectCompany.CREATECOMPANY, item).subscribe({
                next(value) {
                    resolve(
                        new ResponseResult<Company>(
                            HttpStatus.CREATED,
                            HttpStatus[HttpStatus.CREATED],
                            value,
                        ),
                    );
                    sub.unsubscribe()
                },
                error(err) {
                    reject(
                        new HttpException(JSON.stringify(err), HttpStatus.BAD_REQUEST),
                    );
                },
                complete() {
                    new Logger(CompanyController.name + 'onCreate').log('complete');
                },
            });

        });
    }
    @Put(':id')
    async onUpdate(@Param('id') id: string, @Body() item: Company) {
        return new Promise((resolve, reject) => {
            const sub = this.client.send(EventSubjectCompany.GETCOMPANYBYID, id).subscribe((company) => {
                if (!isNullObj(company)) {
                    const sub = this.client.send(EventSubjectCompany.UPDATECOMPANY, item).subscribe({
                        next(value) {
                            resolve(
                                new ResponseResult<Company>(
                                    HttpStatus.OK,
                                    HttpStatus[HttpStatus.OK],
                                    value,
                                ),
                            );
                            sub.unsubscribe()
                        },
                        error(err) {
                            reject(
                                new HttpException(JSON.stringify(err), HttpStatus.BAD_REQUEST),
                            );
                        },
                        complete() {
                            new Logger(CompanyController.name + 'onCreate').log('complete');
                        },
                    });
                } else {
                    reject(new HttpException(
                        `CompanyId ${id} is Not Object In DB `,
                        HttpStatus.BAD_REQUEST,
                    ));
                }
                sub.unsubscribe();
            })


        });
    }
    @Delete(':id')
    async onDelete(@Param('id') id: string) {
        return new Promise((resolve, reject) => {
            const sub = this.client.send(EventSubjectCompany.GETCOMPANYBYID, id).subscribe((company) => {
                if (!isNullObj(company)) {
                    const sub = this.client.send(EventSubjectCompany.DELETECOMPANY, company.id).subscribe({
                        next(value) {
                            resolve(
                                new ResponseResult<Company>(
                                    HttpStatus.OK,
                                    HttpStatus[HttpStatus.OK],
                                    value,
                                ),
                            );
                            sub.unsubscribe()
                        },
                        error(err) {
                            reject(
                                new HttpException(JSON.stringify(err), HttpStatus.BAD_REQUEST),
                            );
                        },
                        complete() {
                            new Logger(CompanyController.name + 'onCreate').log('complete');
                        },
                    });
                } else {
                    reject(new HttpException(
                        `CompanyId ${id} is Not Object In DB `,
                        HttpStatus.BAD_REQUEST,
                    ));
                }
                sub.unsubscribe();
            })


        });
    }
    @Get()
    async getAll(@Query() query: Company) {
        return new Promise((resolve, reject) => {
            const search = new Search<Company>(query);
            const sub1 = this.client.send(EventSubjectCompany.GETCOUNTCOMPANY, {data:null}).subscribe((count) => {
                sub1.unsubscribe()
                const sub2 = this.client.send(EventSubjectCompany.GETCOMPANY, search).subscribe({
                    next(value) {
                        console.log(value);

                        resolve(
                            new ResponseResult<Company>(
                                HttpStatus.OK,
                                HttpStatus[HttpStatus.OK],
                                value, null, count
                            ),
                        );
                        sub2.unsubscribe()
                    },
                    error(err) {
                        reject(
                            new HttpException(JSON.stringify(err), HttpStatus.BAD_REQUEST),
                        );
                    },
                    complete() {
                        new Logger(CompanyController.name + 'getAll').log('complete');
                    },
                });
            })


        });
    }
    @Get(':id')
    getById(@Param('id') id: string) {
        return new Promise((resolve, reject) => {
            const sub = this.client.send(EventSubjectCompany.GETCOMPANYBYID, id).subscribe({
                next(value) {
                    resolve(
                        new ResponseResult<Company>(
                            HttpStatus.OK,
                            HttpStatus[HttpStatus.OK],
                            value,
                        ),
                    );
                    sub.unsubscribe()
                },
                error(err) {
                    reject(
                        new HttpException(JSON.stringify(err), HttpStatus.BAD_REQUEST),
                    );
                },
                complete() {
                    new Logger(CompanyController.name + 'getAll').log('complete');
                },
            });

        });
    }
}
