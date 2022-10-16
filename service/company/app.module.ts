import { CompanycustomesService } from './controllers/companycustomes.service';

import { Module } from '@nestjs/common';
import { ComapnyController } from './controllers/comapny.controller';
import { ConfigService } from '@nestjs/config';
import { CompanyService } from './controllers/company.service';
import { PrismaService } from '@factory/common';
@Module({
  imports: [],
  controllers: [ComapnyController],
  providers: [
    CompanycustomesService, ConfigService, CompanyService, PrismaService],
})
export class AppModule { }
