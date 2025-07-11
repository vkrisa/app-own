import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './app.module';

async function bootstrap() {
  const RABBITMQ_URL = process.env.RABBITMQ_URL as string;
  const app = await NestFactory.create(AuthModule);
  await app.listen(3003);

  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: 'auth-queue',
      queueOptions: { durable: false },
    },
  });

  await microservice.listen();
}

bootstrap();
