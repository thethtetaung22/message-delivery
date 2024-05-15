import { Inject } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GatewayService } from './gateway.service';

@WebSocketGateway()
export class GatewayGateway {

//   @WebSocketServer()
//   server: Server;

//   constructor(@Inject(GatewayService) private readonly gatewayService: GatewayService) { }

//   // @SubscribeMessage('send-message')
//   // handleMessage(client: any, payload: any): string {
//   //   return 'Hello world!';
//   // }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
