import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerModule } from './server/server.module';
import { TrackService } from './track/track.service';

@Module({
  imports: [ServerModule],
  controllers: [AppController],
  providers: [AppService, TrackService],
})
export class AppModule {}
