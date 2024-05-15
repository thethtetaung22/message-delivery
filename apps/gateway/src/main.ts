import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: { retryAttemps: 10, retryDelay: 3000 }
  });
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'), () => {
    console.log(`Gateway service running on port ${configService.get('PORT')}`)
  });
}
bootstrap();
