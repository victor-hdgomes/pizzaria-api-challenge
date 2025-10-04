import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { PizzaAgent } from './ia-agent';
import { CreateMessageDto } from './dto/create-message.dto';
import { Role } from '@prisma/client';

@Injectable()
export class MessagesService {
  private agent = new PizzaAgent();

  constructor(private repository: MessagesRepository) {}

  async sendMessage(dto: CreateMessageDto) {
    const userMessage = await this.repository.create(Role.USER, dto.content);
    const response = this.agent.generateResponse(dto.content);
    const aiMessage = await this.repository.create(Role.ASSISTANT, response);

    return { user: userMessage, assistant: aiMessage };
  }

  async getMessages() {
    return this.repository.findAll();
  }
}
