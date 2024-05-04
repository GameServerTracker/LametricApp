import { Module } from '@nestjs/common';
import { TrackModule } from 'src/track/track.module';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';
import { MetricsService } from './metrics/metrics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ServerMetrics } from './metrics/entities/serverMetrics.entity';
import { Server } from './metrics/entities/server.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Server, ServerMetrics]),
    CacheModule.register(),
    TrackModule
  ],
  controllers: [ServerController],
  providers: [
    ServerService,
    MetricsService
  ]
})
export class ServerModule { }
