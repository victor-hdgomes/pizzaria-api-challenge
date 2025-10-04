import { Module } from '@nestjs/common';
import { MessagesController } from './messages/messages.controller';
import { MessagesService } from './messages/messages.service';
import { MessagesRepository } from './messages/messages.repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository, PrismaService],
})
export class AppModule {}
