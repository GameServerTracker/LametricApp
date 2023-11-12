import { CacheModule, Module } from '@nestjs/common';
import { TrackModule } from 'src/track/track.module';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';
import { ServerMetricsService } from './server-metrics/server-metrics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerMetrics } from './server-metrics/server-metrics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServerMetrics]), CacheModule.register(), TrackModule],
  controllers: [ServerController],
  providers: [ServerService, ServerMetricsService]
})
export class ServerModule {}
