import { Controller, Logger, Post } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    private readonly logger = new Logger(MessageController.name);

    constructor(private readonly messageService: MessageService) { }

    @EventPattern('message_pattern')
    async handleMessage(@Payload() data: any, @Ctx() context: RmqContext) {
        this.logger.log(`Received message: ${JSON.stringify(data)}`);
        console.log('Message Received.',)
    }

    @Post('send')
    async sendMessage() {
        try {
            console.log("sending...");
            const message = { text: 'Hello from NestJS' };
            await this.messageService.sendMessage(message);
            return 'Message sent!';
        } catch (error) {
            console.log('Error:', error);
            // throw new HttpException(error, error.status)
        }
    }
}
