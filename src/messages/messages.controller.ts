import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly service: MessagesService) {}

  @Post()
  async sendMessage(@Body() dto: CreateMessageDto) {
    return this.service.sendMessage(dto);
  }

  @Get()
  async getMessages() {
    return this.service.getMessages();
  }
}
