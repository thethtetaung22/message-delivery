import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './message/message.module';
import { RmqModule } from '../libs/common/src';
import { MESSAGE_SERVICE } from './constants/services';
// import * as Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            // validationSchema: Joi.object({
            //     RMQ_URL: Joi.string().required(),
            //     RMQ_QUEUE: Joi.string().required(),
            // }),
            envFilePath: ['.env.development.local', '.env.development'],
        }),
        MessageModule,
        RmqModule.register({ name: MESSAGE_SERVICE })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
