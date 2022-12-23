import { Controller, Get, Query } from '@nestjs/common';
import ServerCheckedDto from './dto/serverCheckedDto';
import { ServerService } from './server.service';

@Controller('server')
export class ServerController {
    constructor(private readonly serverService: ServerService) { }

    @Get()
    async trackServer(@Query() serverChecked: ServerCheckedDto): Promise<any> {
        return await this.serverService.trackServer(serverChecked);
    }
}
