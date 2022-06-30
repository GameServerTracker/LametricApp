import { Injectable } from '@nestjs/common';
import { ping } from 'minecraft-server-ping';
import { IMinecraftData } from 'minecraft-server-ping/dist/interfaces';
import query from 'source-server-query';

@Injectable()
export class TrackService {
    async trackMinecraftServer(address: string): Promise<string> {
        const addressSplited: string[] = address.split(':');
        const hostname = addressSplited[0];
        const port: number = addressSplited[1] != undefined ? +addressSplited[1] : 25565;
        const optionPing: any = { timeout: 1000 }

        try {
            if (port < 0 || port > 65536 || isNaN(port))
                throw (`Address ${address} has a bad port !`);
            const data: IMinecraftData = await ping(hostname, port, optionPing);
            return `${data.players.online || 0} / ${data.players.max || 0}`;
        } catch (err: any) {
            console.error(err);
            return "OFFLINE";
        }
    }

    async trackSourceServer(address: string): Promise<string> {
        const addressSplited: string[] = address.split(':');
        const hostname = addressSplited[0];
        const port: number = addressSplited[1] != undefined ? +addressSplited[1] : 27015;

        try {
            if (port < 0 || port > 65536 || isNaN(port))
                throw (`Address ${address} has a bad port !`);
            const data: any = await query.info(hostname, port, 1000);
            return `${data.players || 0} / ${data.max_players || 0}`;
        } catch (err: any) {
            console.error(err);
            return "OFFLINE";
        }
    }

    async trackFiveMServer(address: string): Promise<string> {
        return "0 / 0";
    }
}
