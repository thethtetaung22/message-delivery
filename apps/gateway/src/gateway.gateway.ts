import { Inject, Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GatewayService } from './gateway.service';

@WebSocketGateway()
export class GatewayGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    protected readonly logger = new Logger(GatewayGateway.name);
    @WebSocketServer()
    server: Server;

    clients: Socket[] = [];
    constructor(@Inject(GatewayService) private readonly gatewayService: GatewayService) { }

    emitNewMessage(payload: Record<string, any>) {
        // this.server.emit()
    }

    afterInit(server: any) {
        this.logger.log(`Socket initialzed @ ${new Date().toString()}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.clients.push(client);
        this.logger.log(`Client with id ${client?.id} connected @ ${new Date().toString()}`);
        this.logger.log('Client IDs:', this.clients.map(client => client.id))
    }

    handleDisconnect(client: Socket) {
        this.clients = this.clients.filter(c => c.id !== client.id);
        this.logger.log(`Client with id ${client?.id} disconnected @ ${new Date().toString()}`);
        this.logger.log('Client IDs:', this.clients.map(client => client.id))
    }

    @SubscribeMessage('message')
    async handleMessage(client: Socket, payload: any) {
        const result = this.gatewayService.sendMessage(client, payload);
        this.logger.log('New Message Result:', result);
        this.emitToOtherClients(client, payload);
    }

    emitToOtherClients(sender: Socket, payload) {
        this.logger.log('Emitting Client IDs:', this.clients.map(client => client.id))

        for (let client of this.clients) {
            if (sender.id !== client.id) {

                client.emit('new-message', payload);
                this.logger.log(`Emitted to client '${client.id}'`)
            }
        }
    }
}
