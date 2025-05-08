import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  const RABBITMQ_URL = process.env.RABBITMQ_URL as string;

  app.enableCors();

  await app.listen(3002);

  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: 'user-queue',
      queueOptions: { durable: false },
    },
  });

  await microservice.listen();
}

bootstrap();
