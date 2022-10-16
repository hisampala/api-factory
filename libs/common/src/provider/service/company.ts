import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const CompanyMicroserviceService = {
  provide: 'COMPANY_SERVICE',
  useFactory: (config: ConfigService) =>
    ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        servers: [config.get('BASE_HOST_MICROSERVICE')],
        queue: 'CompanyService',
      },
    }),
  inject: [ConfigService],
};
