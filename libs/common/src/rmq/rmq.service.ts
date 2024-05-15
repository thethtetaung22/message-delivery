import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {  RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RmqService {
    private readonly logger = new Logger(RmqService.name);
    constructor(private readonly configService: ConfigService) { }

    getOptions(queue: string, noAck = false): RmqOptions {
        this.logger.debug(this.configService.get<string>('RABBIT_MQ_URI'))
        this.logger.debug(this.configService.get<string>('RABBIT_MQ_MESSAGE_QUEUE'))
        const options: RmqOptions = {
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.get<string>('RABBIT_MQ_URI')],
                queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
                noAck,
                persistent: true,
            },
        };
        this.logger.debug(options)
        return options;
    }

    ack(context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        channel.ack(originalMessage);
    }
}
