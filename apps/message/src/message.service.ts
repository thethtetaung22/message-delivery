import { Injectable } from '@nestjs/common';
import { RmqService } from '@app/common';
import { RmqContext } from '@nestjs/microservices';
import { CreateMesssgeRequest } from './dto/message.dto';
import { MessageRepository } from './message.repository';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessageService {
    constructor(
        private readonly messageRepository: MessageRepository,
        private readonly rmqService: RmqService
    ) { }

    getHello(): string {
        return 'Hello World!';
    }

    async sendNewMessage(data: CreateMesssgeRequest, context): Promise<Message> {
        const session = await this.messageRepository.startTransaction();
        try {
            const message = await this.messageRepository.create(data, { session });
            this.ackContext(context);
            return message;
        } catch (error) {
            session.abortTransaction();
        }
    }

    ackContext(context: RmqContext) {
        this.rmqService.ack(context);
    }
}
