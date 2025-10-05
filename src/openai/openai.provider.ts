import { Injectable, Scope } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable({ scope: Scope.DEFAULT })
export class OpenAIProvider {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  getClient() {
    return this.client;
  }
}
