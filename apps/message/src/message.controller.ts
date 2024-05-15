import { Controller } from '@nestjs/common';
import { MessageService } from './message.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller()
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly rmqService: RmqService
  ) {}

  @EventPattern({ cmd: 'new-message' })
  async sendNewMessage(@Payload() data: Record<string, any>, @Ctx() context: RmqContext) {
    console.log('Data:', data);
    this.rmqService.ack(context);
    return data;
  }
}
