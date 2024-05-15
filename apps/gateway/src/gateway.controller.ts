import { Body, Controller, Get, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {

    constructor(private readonly gatewayService: GatewayService) { }

    @Post('message')
    async (@Body() body: Record<string, any>) {
        return this.gatewayService.sendMessage(body);
    }

    @Get()
    getHello(): string {
        return this.gatewayService.getHello();
    }
}
