import { Injectable, Logger } from '@nestjs/common';
import { ServerMetrics } from './server-metrics.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateServerMetricsDto } from './dto/createServerMetricsDto';

@Injectable()
export class ServerMetricsService {
    constructor(
        @InjectRepository(ServerMetrics)
        private serverMetricsRepository: Repository<ServerMetrics>,
    ) { }

    private readonly logger: Logger = new Logger(ServerMetrics.name);

    async findOne(address: string): Promise<ServerMetrics> {
        try {
            const serverMetrics: ServerMetrics = await this.serverMetricsRepository.findOne({where: {address: address}});
            if (serverMetrics == null) {
                this.logger.warn(`Server metrics for ${address} not found !`);
            }
            return serverMetrics;
        } catch (error) {
            this.logger.error("Error while finding server metrics !", error, error.stack);
            throw error;
        }
    }

    async insert(serverMetricsData: CreateServerMetricsDto): Promise<ServerMetrics> {
        try {
            const serverMetrics = this.serverMetricsRepository.create(serverMetricsData);
            return this.serverMetricsRepository.save(serverMetrics);
        } catch (error) {
            this.logger.error("Error while inserting server metrics !", error, error.stack);
            throw error;
        }
    }
}
