import { Inject, Injectable, Logger } from '@nestjs/common';
import { MESSAGE_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MessageService {
    private readonly logger = new Logger(MessageService.name);

    constructor(@Inject(MESSAGE_SERVICE) private msgClient: ClientProxy) { }

    async sendMessage(message) {
        const lastValue = await lastValueFrom(
            this.msgClient.emit('message_pattern', message),
        );
        this.logger.debug('Last Value from sending message...', lastValue);
    }
}
