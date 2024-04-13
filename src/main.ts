import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import GoalData from './lametric/GoalData';
import FrameGoalDto from './lametric/frameGoalDto';
import FrameTextDto from './lametric/frameTextDto';
import FrameSparklineDto from './lametric/frameSparklineDto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
  .setTitle("Game server tracker - Lametric App")
  .setDescription(`API for the Lametric App : Game Server Tracker (G.S.T).\n
  This app will give you the number of player connected on a game server like Minecraft, Source (CS, CS:GO, Half Life, Gmod, etc), and FiveM (GTA V).`)
  .setVersion("1.0")
  .setContact("BliTz_37", "https://github.com/BliTz037", "blitz@blitzlab.ninja")
  .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, {
    extraModels: [GoalData, FrameGoalDto, FrameTextDto, FrameSparklineDto]
  });

  SwaggerModule.setup('api-docs', app, swaggerDocument);
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false, whitelist: true }))
  await app.listen(process.env.PORT || 3000);
  console.log(`GST Lametric is running. Swagger: ${await app.getUrl()}/api-docs`);
}
bootstrap();
