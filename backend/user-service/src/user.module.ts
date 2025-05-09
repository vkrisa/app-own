import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot()],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
