import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import ServerCheckedDto from './dto/serverCheckedDto';
import { ServerService } from './server.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import FrameDto from 'src/lametric/frameDto';
import RequestIncompleteFilter from 'src/filter/requestIncomplete.filter';

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
        description: "Response if the server is found and online",
        schema: {
            example: {
                "frames": [
                    {
                        "text": "Hypixel",
                        "icon": "7285"
                    },
                    {
                        "text": "47944 / 200000",
                        "icon": "7285"
                    }
                ]
            },
        },
    })
    @UseFilters(RequestIncompleteFilter)
    async trackServer(@Query() serverChecked: ServerCheckedDto): Promise<FrameDto> {
        return await this.serverService.trackServer(serverChecked);
    }
}
