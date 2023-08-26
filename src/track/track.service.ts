import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { Server } from '@fabricio-191/valve-server-query';
import * as minecraftServer from 'minecraft-server-util';

@Injectable()
export class TrackService {

    private readonly logger: Logger = new Logger(TrackService.name);

    async trackMinecraftServer(address: string): Promise<string> {
        const addressSplited: string[] = address.split(':');
        const hostname = addressSplited[0];
        const port: number = addressSplited[1] != undefined ? +addressSplited[1] : 25565;
        const options: minecraftServer.JavaStatusOptions = { timeout: 2000, enableSRV: true };

        try {
            if (port < 0 || port > 65536 || isNaN(port))
                throw (`Address ${address} has a bad port !`);
            const data: minecraftServer.JavaStatusResponse = await minecraftServer.status(hostname, port, options);
            return `${data.players.online || 0} / ${data.players.max || 0}`;
        } catch (err: any) {
            this.logger.warn(`[MC, ${address}] ${err.name}: ${err.message}`);
            return "OFFLINE";
        }
    }

    async trackMinecraftBedrockServer(address: string): Promise<string> {
        const addressSplited: string[] = address.split(':');
        const hostname = addressSplited[0];
        const port: number = addressSplited[1] != undefined ? +addressSplited[1] : 25565;
        const options: minecraftServer.BedrockStatusOptions = { timeout: 2000, enableSRV: true };

        try {
            if (port < 0 || port > 65536 || isNaN(port))
                throw (`Address ${address} has a bad port !`);
            const data: minecraftServer.BedrockStatusResponse = await minecraftServer.statusBedrock(hostname, port, options);
            return `${data.players.online || 0} / ${data.players.max || 0}`;
        } catch (err: any) {
            this.logger.warn(`[MC Bedrock, ${address}] ${err.name}: ${err.message}`);
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
            this.logger.warn(`[Source, ${address}] ${err.name}: ${err.message}`);
            return "OFFLINE";
        }
    }

    async trackFiveMServer(address: string): Promise<string> {
        try {
            const response: AxiosResponse = await axios.get(`http://${address}/dynamic.json`, { timeout: 2000 });
            return `${response.data.clients} / ${response.data.sv_maxclients}`;
        } catch (err: any) {
            this.logger.warn(`[FiveM, ${address}] ${err.name}: ${err.message}`);
            return "OFFLINE";
        }
    }

    async trackFiveMServerByCfx(code: string): Promise<any> {
        try {
            const response: AxiosResponse = await axios.get(`https://servers-frontend.fivem.net/api/servers/single/${code}`, { timeout: 2000, headers: { 'User-Agent': 'GST API' } });
            return `${response.data.Data.clients} / ${response.data.Data.sv_maxclients}`;
        } catch (err: any) {
            this.logger.warn(`[FiveM CFX, ${code}] ${err.name}: ${err.message}`);
            return "OFFLINE";
        }
    }
}
