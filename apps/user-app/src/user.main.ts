import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'users',
      protoPath: join(__dirname, '../../../protos/users.proto'),
      url: 'localhost:50051',
    },
  });
  await app.startAllMicroservices();
  await app.listen(3011);
}
bootstrap();
