import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Message, Role } from '@prisma/client';

@Injectable()
export class MessagesRepository {
  constructor(private prisma: PrismaService) {}

  async create(role: Role, content: string, userId: string): Promise<Message> {
    return this.prisma.message.create({
      data: {
        role,
        content,
        userId,
      },
    });
  }

  async findAll(userId: string): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findToday(userId: string) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    return this.prisma.message.findMany({
      where: {
        userId,
        createdAt: {
          gte: startOfDay,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
