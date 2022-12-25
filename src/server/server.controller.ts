import { CACHE_MANAGER, Controller, Get, Inject, Query } from '@nestjs/common';
import ServerCheckedDto from './dto/serverCheckedDto';
import { ServerService } from './server.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';

@ApiTags('Server')
@Controller('server')
export class ServerController {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly serverService: ServerService) { }

    @Get()
    @ApiOperation({
        summary: "Get number of player connected",
        description: "Return a JSON response which should be read by the lametric clock with :\n- The name of your server\n- The icon of game server\n- The number of player connected.",
    })
    @ApiResponse({
        status: 200,
        schema: {
            example: {
                "frames": [
                    {
                        "text": "Hypixel",
                        "icon": "7285"
                    },
                    {
                        "text": "33722 / 100000",
                        "icon": "7285"
                    }
                ]
            }
        }
    })

    async trackServer(@Query() serverChecked: ServerCheckedDto): Promise<any> {
        const cache: any = await this.cacheManager.get(`${serverChecked.type}:${serverChecked.address}`);

        if (cache != null) {
            console.log("Data Cache !");
            console.log(cache);
            return {
                "frames": [
                    {
                        "text": serverChecked.name,
                    },
                    {
                        "text": cache,
                    }
                ]
            }
        }
        return await this.serverService.trackServer(serverChecked);
    }
}
