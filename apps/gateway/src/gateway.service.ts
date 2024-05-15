import { Inject, Injectable, Logger } from '@nestjs/common';
import { MESSAGE_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
    logger = new Logger(GatewayService.name);

    constructor(
        @Inject(MESSAGE_SERVICE) private msgClient: ClientProxy
    ) { }

    async sendMessage(requst: Record<string, any>) {
        try {
            return await this.msgClient.send({ cmd: 'new-message' }, { requst }).toPromise()
            // return await lastValueFrom(
            // );
        } catch (error) {
            this.logger.error('error sending message to message service:', error)
            throw error
        }
    }

    getHello(): string {
        return 'Hello World!';
    }
}
