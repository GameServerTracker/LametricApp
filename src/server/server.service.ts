import { Injectable } from '@nestjs/common';
import { serverIconDict, serverTypeDict } from 'src/config/dict';
import { IconServer, ServerType } from 'src/config/enum';
import { TrackService } from 'src/track/track.service';
import ServerCheckedDto from './dto/serverCheckedDto';

@Injectable()
export class ServerService {
    constructor(private readonly trackService: TrackService) { }

    readonly actionDict: { [id in ServerType]: (address: string) => Promise<string> } =
        {
            Minecraft: this.trackService.trackMinecraftServer,
            Source: this.trackService.trackSourceServer,
            FiveM: this.trackService.trackFiveMServer
        };

    async trackServer(serverChecked: ServerCheckedDto): Promise<any> {
        const type: ServerType = serverTypeDict[serverChecked.type];
        const icon: IconServer = serverIconDict[type];
        const result: string = await this.actionDict[type](serverChecked.address);

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
