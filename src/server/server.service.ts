import { Inject, Injectable } from '@nestjs/common';
import { serverIconDict } from 'src/config/dict';
import { IconServer, ServerTypeParams } from 'src/config/enum';
import { TrackService } from 'src/track/track.service';
import ServerCheckedDto from './dto/serverCheckedDto';
import { Cache } from 'cache-manager';
import FrameDto from 'src/lametric/frameDto';
import FrameTextDto from 'src/lametric/frameTextDto';
import { MetricsService } from './metrics/metrics.service';
import { ServerTrackResultDto } from 'src/track/dto/serverTrackResultDto';
import FrameSparklineDto from 'src/lametric/frameSparklineDto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { EServerType } from './enums/serverType.enum';

@Injectable()
export class ServerService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly trackService: TrackService,
        private readonly metricsService: MetricsService
    ) { }

    readonly actionDict: { [id in ServerTypeParams]: (address: string) => Promise<ServerTrackResultDto> } = {
        Minecraft: (address: string) => this.trackService.trackMinecraftServer(address),
        MinecraftBedrock: (address: string) => this.trackService.trackMinecraftBedrockServer(address),
        Source: (address: string) => this.trackService.trackSourceServer(address),
        FiveM: (address: string) => this.trackService.trackFiveMServer(address),
        FiveMCfxCode: (code: string) => this.trackService.trackFiveMServerByCfx(code)
    };

    readonly serverTypesDict: { [id in ServerTypeParams]: EServerType } = {
        Minecraft: EServerType.Minecraft,
        MinecraftBedrock: EServerType.MinecraftBedrock,
        Source: EServerType.Source,
        FiveM: EServerType.FiveM,
        FiveMCfxCode: EServerType.FiveMCfxCode
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
            this.metricsService.insert({
                address: serverChecked.address,
                type: this.serverTypesDict[serverChecked.type],
                playersOnline: result.playersOnline,
                playersMax: result.playersMax,
                agent: 'lametric',
                playerList: result.playerList,
                isOnline: result.isOnline,
                errorMessage: result.errorMessage
            });
        }
        frame.frames.push(new FrameTextDto(result.isOnline ? `${result.playersOnline} / ${result.playersMax}` : "OFFLINE", icon));
        if (serverChecked.sparkline === "true") {
            frame.frames.push(new FrameSparklineDto(1, await this.metricsService.getAllPlayersOnlineValues(serverChecked.address, this.serverTypesDict[serverChecked.type])));
        }
        return frame;
    }
}
