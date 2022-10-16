import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { async } from 'rxjs';
import { AppModule } from './app.module';

async function start() {

    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: true }),
    );

    StartMicroservice(app)

}
function StartMicroservice(app: NestFastifyApplication) {
     const conf = app.get<ConfigService>(ConfigService);
    const loggerMicroservice = new Logger('Company Microservice');
    app.connectMicroservice({
        transport: Transport.NATS,
        options: {
          servers: [conf.get('BASE_HOST_MICROSERVICE')],
          // queue: "create-flight-details",
        },
      });
    app.startAllMicroservices()
        .then(() => {
            loggerMicroservice.log('Microservice Started.....');
        })
        .catch((error) => {
            loggerMicroservice.error('Microservice is Error ', error);
        });
}

export const CompanyServiceStart = start