import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { ConfigModule } from '@nestjs/config';
import { MESSAGE_SERVICE, RmqModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./apps/message/.env'],
    }),
    RmqModule.register({ name: MESSAGE_SERVICE })
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule { }
