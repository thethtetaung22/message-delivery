import { NestFactory } from '@nestjs/core';
import { MessageModule } from './message.module';
// import { MESSAGE_SERVICE, RmqService } from '@app/common';
import { Transport } from '@nestjs/microservices';
// import * as dotenv from 'dotenv';

// dotenv.config({
//   path: `./apps/message/.env`
// })
// console.log('rmQ>>>', process.env.RABBIT_MQ_URI)

async function bootstrap() {
  const app = await NestFactory.createMicroservice(MessageModule,
    {
      name: 'MESSAGE_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBIT_MQ_URI],
        queue: process.env.RABBIT_MQ_MESSAGE_QUEUE,
        noAck: false,
        persistent: true,
      },
    }
  );
  app.listen().then(() => {
    console.log('Message service running as microservice.')
  });
}
bootstrap();
