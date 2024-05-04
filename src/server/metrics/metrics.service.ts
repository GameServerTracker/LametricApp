import { Injectable, Logger } from '@nestjs/common';
import { ServerMetrics } from './entities/serverMetrics.entity';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateServerMetricsDto } from './dto/createServerMetricsDto';
import { Server } from './entities/server.entity';
import { EServerType } from '../enums/serverType.enum';

@Injectable()
export class MetricsService {
    constructor(
        @InjectRepository(Server)
        private serverRepository: Repository<Server>,
        @InjectRepository(ServerMetrics)
        private metricsRepository: Repository<ServerMetrics>,
    ) { }

    private readonly logger: Logger = new Logger(ServerMetrics.name);

    async insert(serverMetricsData: CreateServerMetricsDto): Promise<ServerMetrics | null> {
        try {
            let server: Server = await this.serverRepository.findOne({ where: { address: serverMetricsData.address, type: serverMetricsData.type }, select: ['id'] });
            if (server == null) {
                if (serverMetricsData.isOnline == false) {
                    this.logger.warn(`Server ${serverMetricsData.address} not registered and is offline, ignore !`);
                    return null;
                }
                this.logger.warn(`Server ${serverMetricsData.address} not registered, insert !`);
                server = this.serverRepository.create({
                    address: serverMetricsData.address,
                    type: serverMetricsData.type,
                    name: null 
                });
                server = await this.serverRepository.save(server);
            }
            const serverMetrics: ServerMetrics = await this.metricsRepository.save({
                server_id: server.id,
                player_current: serverMetricsData.playersOnline,
                player_max: serverMetricsData.playersMax,
                agent: serverMetricsData.agent,
                player_list: serverMetricsData.playerList,
                is_online: serverMetricsData.isOnline,
                error_message: serverMetricsData.errorMessage
            });
            this.logger.log(`Server metrics inserted for ${serverMetricsData.address} !`);
            return serverMetrics;
        } catch (error) {
            this.logger.error("Error while inserting server metrics !", error, error.stack);
            return null;
        }
    }

    async getAllPlayersOnlineValues(address: string, type: EServerType): Promise<number[]> {
        const today: Date = new Date();
        const oneDaysAgo: Date = new Date();
        oneDaysAgo.setDate(today.getDate() - 1);

        const metrics: ServerMetrics[] = await this.metricsRepository.find({
            relations: {server: true},
            where: {
                server: { address, type},
                created: Between(oneDaysAgo, today)
            },
            order: { created: "ASC" }
        });
        return metrics.map((metric) => metric.player_current);
    }
}
