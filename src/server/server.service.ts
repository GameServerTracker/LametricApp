import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { serverIconDict } from 'src/config/dict';
import { IconServer, ServerType } from 'src/config/enum';
import { TrackService } from 'src/track/track.service';
import ServerCheckedDto from './dto/serverCheckedDto';
import { Cache } from 'cache-manager';

@Injectable()
export class ServerService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly trackService: TrackService) { }

    readonly actionDict: { [id in ServerType]: (address: string) => Promise<string> } =
        {
            Minecraft: this.trackService.trackMinecraftServer,
            Source: this.trackService.trackSourceServer,
            FiveM: this.trackService.trackFiveMServer
        };

    async trackServer(serverChecked: ServerCheckedDto): Promise<any> {
        const icon: IconServer = serverIconDict[serverChecked.type];
        const cache: any = await this.cacheManager.get(`${serverChecked.type}:${serverChecked.address}`);
        let result: string = null;

        if (cache != null) {
            result = cache;
        } else {
            result = await this.actionDict[serverChecked.type](serverChecked.address);
            this.cacheManager.set(`${serverChecked.type}:${serverChecked.address}`, result, 5 * 60 * 1000);
        }
        return {
            "frames": [
                {
                    "text": serverChecked.name,
                    "icon": icon
                },
                {
                    "text": result,
                    "icon": icon
                }
            ]
        }
    }
}
