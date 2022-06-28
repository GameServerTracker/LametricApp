import { Controller, Get, Param } from '@nestjs/common';
import ServerCheckedDto from './dto/serverCheckedDto';
import { ServerService } from './server.service';

@Controller('server')
export class ServerController {
    constructor(private readonly serverService: ServerService) { }

    @Get()
    async trackServer(@Param() serverChecked: ServerCheckedDto): Promise<any> {
        return await this.serverService.trackServer(serverChecked);
    }
}
