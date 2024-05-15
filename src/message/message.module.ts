import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { RmqModule } from '@app/common';
import { MESSAGE_SERVICE } from '../constants/services';

@Module({
    imports: [
        RmqModule.register({ name: MESSAGE_SERVICE })
    ],
    controllers: [MessageController],
    providers: [MessageService],
    exports: [MessageService],
})
export class MessageModule { }
