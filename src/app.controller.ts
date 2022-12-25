import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Default')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOperation({
    summary: "Ping the API",
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        message: 'GameServerTracker 3.0 is OK !'
      }
    }
  })
  getHello(): any {
    return this.appService.getHello();
  }
}
