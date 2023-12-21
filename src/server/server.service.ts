import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { serverIconDict } from 'src/config/dict';
import { IconServer, ServerType } from 'src/config/enum';
import { TrackService } from 'src/track/track.service';
import ServerCheckedDto from './dto/serverCheckedDto';
import { Cache } from 'cache-manager';
import FrameDto from 'src/lametric/frameDto';
import FrameTextDto from 'src/lametric/frameTextDto';
import { ServerMetricsService } from './server-metrics/server-metrics.service';
import { ServerTrackResultDto } from 'src/track/dto/serverTrackResultDto';
import FrameSparklineDto from 'src/lametric/frameSparklineDto';

@Injectable()
export class ServerService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly trackService: TrackService,
        //private readonly serverMetricsService: ServerMetricsService
    ) { }

    readonly actionDict: { [id in ServerType]: (address: string) => Promise<ServerTrackResultDto> } = {
        Minecraft: (address: string) => this.trackService.trackMinecraftServer(address),
        MinecraftBedrock: (address: string) => this.trackService.trackMinecraftBedrockServer(address),
        Source: (address: string) => this.trackService.trackSourceServer(address),
        FiveM: (address: string) => this.trackService.trackFiveMServer(address),
        FiveMCfxCode: (code: string) => this.trackService.trackFiveMServerByCfx(code)
    };

    async trackServer(serverChecked: ServerCheckedDto): Promise<FrameDto> {
        const icon: IconServer = serverIconDict[serverChecked.type];
        const cache: any = await this.cacheManager.get(`${serverChecked.type}:${serverChecked.address}`);
        const frame: FrameDto = { frames: [new FrameTextDto(serverChecked.name, icon)] };
        let result: ServerTrackResultDto;

        if (cache) {
            result = cache;
        } else {
            result = await this.actionDict[serverChecked.type](serverChecked.address);
            this.cacheManager.set(`${serverChecked.type}:${serverChecked.address}`, result, 5 * 60 * 1000);
            // this.serverMetricsService.insert({
            //     address: serverChecked.address,
            //     type: serverChecked.type,
            //     playersOnline: result.playersOnline,
            //     playersMax: result.playersMax,
            // });
        }
        frame.frames.push(new FrameTextDto(result.isOnline ? `${result.playersOnline} / ${result.playersMax}` : "OFFLINE", icon));
        if (serverChecked.sparkline === "true") {
            //frame.frames.push(new FrameSparklineDto(1, await this.serverMetricsService.getAllPlayersOnlineValues(serverChecked.address, serverChecked.type)));
        }
        return frame;
    }
}
