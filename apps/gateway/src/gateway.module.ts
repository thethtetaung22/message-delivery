import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/common';
import { MESSAGE_SERVICE } from '@app/common';
import { GatewayGateway } from './gateway.gateway';
// import { GatewayGateway } from './gateway.gateway';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            // validationSchema: Joi.object({
            //     RMQ_URL: Joi.string().required(),
            //     RMQ_QUEUE: Joi.string().required(),
            // }),
            envFilePath: ['./apps/gateway/.env'],
        }),
        RmqModule.register({ name: MESSAGE_SERVICE }),
    ],
    controllers: [GatewayController],
    providers: [
        GatewayService,
        GatewayGateway
    ],
})
export class GatewayModule { }
