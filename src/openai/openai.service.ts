import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateResponse(
    systemPrompt: string,
    messagesToday: {
      id: string;
      role: Role;
      content: string;
      createdAt: Date;
      userId: string;
    }[],
    userInput: string,
  ): Promise<string> {
    const model = process.env.OPENAI_MODEL;

    if (!model) {
      throw new HttpException(
        'Erro ao processar a solicitação.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const formattedMessages = messagesToday.map((msg) => ({
      role: msg.role === Role.USER ? ('user' as const) : ('assistant' as const),
      content: msg.content,
    }));

    formattedMessages.push({ role: 'user', content: userInput });

    const completion = await this.client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        ...formattedMessages,
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message?.content ?? 'Erro ao gerar resposta.';
  }
}
