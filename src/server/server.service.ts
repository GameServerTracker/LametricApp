import { Injectable } from '@nestjs/common';
import { IconServer } from 'src/config/enum';
import { TrackService } from 'src/track/track.service';
import ServerCheckedDto from './dto/serverCheckedDto';

@Injectable()
export class ServerService {
    constructor(private readonly trackService: TrackService) { }

    async trackServer(serverChecked: ServerCheckedDto): Promise<any> {
        console.log(serverChecked);
        return {
            "frames": [
                {
                    "text": "Server",
                    "icon": IconServer.Unknown
                },
                {
                    "text": "OFFLINE",
                    "icon": IconServer.Unknown
                }
            ]
        }
    }
}
