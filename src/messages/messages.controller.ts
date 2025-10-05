import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import { AuthTokenGuard } from '../auth/guard/auth-token.guard';
import { TokenPayloadParam } from '@/src/auth/param/token-payload.param';
import { JwtPayloadDto } from '../auth/dtos';

@Controller('messages')
@UseGuards(AuthTokenGuard)
export class MessagesController {
  constructor(private readonly service: MessagesService) {}

  @Post()
  async sendMessage(
    @Body() dto: CreateMessageDto,
    @TokenPayloadParam() tokenPayload: JwtPayloadDto,
  ) {
    return this.service.sendMessage(dto, tokenPayload);
  }

  @Get()
  async getMessages(@TokenPayloadParam() tokenPayload: JwtPayloadDto) {
    return this.service.getMessages(tokenPayload);
  }
}
