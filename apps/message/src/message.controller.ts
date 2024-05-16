import { Controller } from '@nestjs/common';
import { MessageService } from './message.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateMesssgeRequest } from './dto/message.dto';

@Controller()
export class MessageController {
    constructor(
        private readonly messageService: MessageService,
    ) { }

    @EventPattern({ cmd: 'new-message' })
    async sendNewMessage(@Payload() data: CreateMesssgeRequest, @Ctx() context: RmqContext) {
        console.log('Data:', data);
        return await this.messageService.sendNewMessage(data, context);
    }

}
