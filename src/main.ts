import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { CompanyServiceStart } from 'service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await StartMicroservice(app);
  await CompanyServiceStart();

  await app.listen(3000);
}
bootstrap();
function StartMicroservice(app: NestFastifyApplication) {
  const conf = app.get<ConfigService>(ConfigService);
  const loggerMicroservice = new Logger('Gateway Microservice');
  app.connectMicroservice({
    transport: Transport.NATS,
    options: {
      servers: [conf.get('BASE_HOST_MICROSERVICE')],
      // queue: "create-flight-details",
    },
  });
  app
    .startAllMicroservices()
    .then(() => {
      loggerMicroservice.log('Microservice Started.....');
    })
    .catch((error) => {
      loggerMicroservice.error('Microservice is Error ', error);
    });
}
