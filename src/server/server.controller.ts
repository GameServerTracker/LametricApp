import { Controller, Get, Query } from '@nestjs/common';
import ServerCheckedDto from './dto/serverCheckedDto';
import { ServerService } from './server.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Server')
@Controller('server')
export class ServerController {
    constructor(private readonly serverService: ServerService) { }

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
        return await this.serverService.trackServer(serverChecked);
    }
}
