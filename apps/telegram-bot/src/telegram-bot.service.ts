import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { Context, Markup, Telegraf } from 'telegraf';
import { firstValueFrom } from 'rxjs';

@Injectable()
@Update()
export class TelegramBotService {
  constructor(
    // private readonly chatService: ChatGPTApiService,
    @InjectBot() private telegramVisitBot: Telegraf<Context>,
    @Inject('USERS_SERVICE') private client: ClientGrpc,
  ) {}
  private usersService: any;

  onModuleInit() {
    this.usersService = this.client.getService('UsersService');
  }

  @Start()
  async start(ctx: Context) {
    await ctx.reply(
      'გთხოვთ, გააზიაროთ თქვენი მობილურის ნომერი 👇',
      Markup.keyboard([[Markup.button.contactRequest('📱 გაზიარე ნომერი')]])
        .oneTime()
        .resize(),
    );
  }

  @On('contact')
  async onContact(ctx: Context) {
    // console.log('ctx', ctx);
    // <- TypeScript-ს ეუბნები "დამიჯერე, contact არსებობს"
    const contact = (ctx.message as any).contact;

    if (!contact?.phone_number) {
      return ctx.reply('მობილურის ნომრის მიღება ვერ მოხერხდა.');
    }

    const chatID = ctx.message?.from?.id;
    const phoneNumber = contact?.phone_number?.replace('995', '');
    console.log('chat id', typeof chatID);

    try {
      const response = await firstValueFrom(
        // await this.usersService.FindUserByMobile({ mobile: phoneNumber }),
        await this.usersService.FindUserByMobile({
          mobile: phoneNumber,
          telegramID: chatID,
        }),
      );
      console.log('telegram service response ', response);
      // return await response;
      // if (result.success) {
      //   await ctx.reply('თქვენი წარმატებით გაიარეთ ავტორიზაცია...');
      // } else {
      //   await ctx.reply('შეცდომა მოხდა მონაცემების შენახვისას.');
      // }
    } catch (err) {
      console.error('gRPC error:', err);
      await ctx.reply('შეცდომა მოხდა.');
    }

    await ctx.reply(
      'თქვენი წარმატებით გაიარეთ ავტორიზაცია ჩვენს ტელეგრამ ბოტში! უკვე შეგიძლიათ ისარგებლოთ შესაბამისი ღილაკებით:',
      // Markup.inlineKeyboard([
      //   Markup.button.callback('🟢 ON', 'on_event'),
      //   Markup.button.callback('🔴 OFF', 'off_event'),
      // ]),
    );
  }
}
