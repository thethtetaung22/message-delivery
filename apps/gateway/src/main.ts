import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';
import { MESSAGE_SERVICE, RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const rmqService = app.get(RmqService);
  app.connectMicroservice(rmqService.getOptions(MESSAGE_SERVICE));
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'), () => {
    console.log(`Gateway service running on port ${configService.get('PORT')}`)
  });
}
bootstrap();
