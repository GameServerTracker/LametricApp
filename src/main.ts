import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
  .setTitle("Game server tracker - Lametric App")
  .setDescription(`API for the Lametric App : Game Server Tracker (G.S.T).\n
  This app will give you the number of player connected on a game server like Minecraft, Source (CS, CS:GO, Half Life, Gmod, etc), and FiveM (GTA V).`)
  .setVersion("1.0")
  .setContact("BliTz_37", "https://github.com/BliTz037", "blitz@blitzlab.ninja")
  .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api-docs', app, swaggerDocument);
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false, whitelist: true }))
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
