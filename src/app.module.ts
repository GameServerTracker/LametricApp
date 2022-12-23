import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerModule } from './server/server.module';
import { TrackService } from './track/track.service';
import { TrackModule } from './track/track.module';

@Module({
  imports: [ServerModule, TrackModule],
  controllers: [AppController],
  providers: [AppService, TrackService],
})
export class AppModule {}
