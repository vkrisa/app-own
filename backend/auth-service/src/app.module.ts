import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from './rabbitmq.module';

@Module({
  imports: [ConfigModule.forRoot(), RabbitMQModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
