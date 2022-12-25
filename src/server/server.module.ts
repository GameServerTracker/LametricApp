import { CacheModule, Module } from '@nestjs/common';
import { TrackModule } from 'src/track/track.module';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';

@Module({
  imports: [CacheModule.register(), TrackModule],
  controllers: [ServerController],
  providers: [ServerService]
})
export class ServerModule {}
