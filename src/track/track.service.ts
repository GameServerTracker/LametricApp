import { Injectable, Logger } from '@nestjs/common';
import { ping } from 'minecraft-server-ping';
import { IMinecraftData } from 'minecraft-server-ping/dist/interfaces';
import axios, { AxiosResponse } from 'axios';
import { Server } from '@fabricio-191/valve-server-query';

@Injectable()
export class TrackService {

    async trackMinecraftServer(address: string): Promise<string> {
        const addressSplited: string[] = address.split(':');
        const hostname = addressSplited[0];
        const port: number = addressSplited[1] != undefined ? +addressSplited[1] : 25565;
        const optionPing: any = { timeout: 2000 }

        try {
            if (port < 0 || port > 65536 || isNaN(port))
                throw (`Address ${address} has a bad port !`);
            const data: IMinecraftData = await ping(hostname, port, optionPing);
            return `${data.players.online || 0} / ${data.players.max || 0}`;
        } catch (err: any) {
            Logger.warn(`[MC server | ${address}] ${err.name}: ${err.message}`);
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
            const server: Server = await Server({ ip: hostname, port, timeout: 3000 });
            const data: any = await server.getInfo();
            return `${data.players.online || 0} / ${data.players.max || 0}`;
        } catch (err: any) {
            Logger.warn(`[Source server | ${address}] ${err.name}: ${err.message}`);
            return "OFFLINE";
        }
    }

    async trackFiveMServer(address: string): Promise<string> {
        try {
            const response: AxiosResponse = await axios.get(`http://${address}/dynamic.json`, { timeout: 2000 });
            return `${response.data.clients} / ${response.data.sv_maxclients}`;
        } catch (err: any) {
            Logger.warn(`[FiveM server | ${address}] ${err.name}: ${err.message}`);
            return "OFFLINE";
        }
    }

    async trackFiveMServerByCfx(code: string): Promise<any> {
        try {
            const response: AxiosResponse = await axios.get(`https://servers-frontend.fivem.net/api/servers/single/${code}`, { timeout: 2000, headers: { 'User-Agent': 'GST API' } });
            return `${response.data.Data.clients} / ${response.data.Data.sv_maxclients}`;
        } catch (err: any) {
            Logger.warn(`[FiveM server | CFX ${code}] ${err.name}: ${err.message}`);
            return "OFFLINE";
        }
    }
}
