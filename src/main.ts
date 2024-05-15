import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    console.log(process.env.RMQ_URL, process.env.RMQ_QUEUE);
    const app = await NestFactory.create(AppModule)
    // const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    //     transport: Transport.RMQ,
    //     options: {
    //         urls: [process.env.RMQ_URL],
    //         queue: process.env.RMQ_QUEUE,
    //         queueOptions: {
    //             durable: true
    //         },
    //     },
    // });

    await app.listen(3000).then(() => {
        console.log('Message delivery server running at port 3000.');
    });

}
bootstrap();
