import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Message, Role } from '@prisma/client';

@Injectable()
export class MessagesRepository {
  constructor(private prisma: PrismaService) {}

  async create(role: Role, content: string): Promise<Message> {
    return this.prisma.message.create({ data: { role, content } });
  }

  async findAll(): Promise<Message[]> {
    return this.prisma.message.findMany({ orderBy: { createdAt: 'asc' } });
  }
}
