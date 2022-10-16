import { CompanyController } from './controllers/company.controller';

import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { CompanyMicroserviceService } from '@factory/common';

@Module({
  imports: [],
  controllers: [CompanyController],
  providers: [ConfigService, CompanyMicroserviceService],
})
export class AppModule {}
