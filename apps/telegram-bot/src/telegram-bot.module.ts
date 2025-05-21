import { Module } from '@nestjs/common';
import { TelegramBotController } from './telegram-bot.controller';
import { TelegramBotService } from './telegram-bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: '8049794627:AAHXkdS4MRFzwnUwoLO6oX5waHkZavlExBs',
        // token: process.env.TELEGRAM_BOT_TOKEN_CLIENT_XAREA,
        // botName: 'visitBot',
      }),
    }),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'users',
          protoPath: join(__dirname, '../../../protos/users.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  controllers: [TelegramBotController],
  providers: [TelegramBotService],
})
export class TelegramBotModule {}
