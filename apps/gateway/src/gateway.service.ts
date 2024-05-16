import { Inject, Injectable, Logger } from '@nestjs/common';
import { MESSAGE_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class GatewayService {
    logger = new Logger(GatewayService.name);

    constructor(
        @Inject(MESSAGE_SERVICE) private msgClient: ClientProxy
    ) { }

    async sendMessage(client: Socket, payload: Record<string, any>) {
        try {
            const response = await this.msgClient.send({ cmd: 'new-message' }, { payload }).toPromise();
            this.logger.log('Response:', response)
        } catch (error) {
            this.logger.error('error sending message to message service:', error)
            throw error
        }
    }

    getHello(): string {
        return 'Hello World!';
    }
}
