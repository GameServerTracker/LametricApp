import { Module } from '@nestjs/common';
import { TrackService } from './track.service';

@Module({
    providers: [TrackService],
    exports: [TrackService]
})
export class TrackModule {}
