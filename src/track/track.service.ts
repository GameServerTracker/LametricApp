import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackService {
    async trackMinecraftServer(address: string) : Promise<string> {
        return "0 / 0";
    }

    async trackSourceServer(address: string) : Promise<string> {
        return "0 / 0";
    }

    async trackFiveMServer(address: string) : Promise<string> {
        return "0 / 0";
    }
}
