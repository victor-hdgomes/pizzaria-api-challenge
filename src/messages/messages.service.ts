import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { CreateMessageDto } from './dtos/create-message.dto';
import { Role } from '@prisma/client';
import { OpenAIService } from '../openai/openai.service';
import { Prompts } from '../openai/commons/prompts';
import { JwtPayloadDto } from '../auth/dtos';

@Injectable()
export class MessagesService {
  constructor(
    private readonly repository: MessagesRepository,
    private readonly openAI: OpenAIService,
  ) {}

  async sendMessage(dto: CreateMessageDto, { sub }: JwtPayloadDto) {
    const userMessage = await this.repository.create(
      Role.USER,
      dto.content,
      sub,
    );

    const messagesToday = await this.repository.findToday(sub);

    const aiResponse = await this.openAI.generateResponse(
      Prompts.SYSTEM,
      messagesToday,
      dto.content,
    );

    const aiMessage = await this.repository.create(
      Role.ASSISTANT,
      aiResponse,
      sub,
    );

    return { user: userMessage, assistant: aiMessage };
  }

  async getMessages({ sub }: JwtPayloadDto) {
    return this.repository.findAll(sub);
  }
}
