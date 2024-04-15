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
    description: "This route is used to know if the API is alive or not."
  })
  @ApiResponse({
    status: 200,
    schema: {
      description: "The API is alive ! It's a good sign !",
      example: {
        message: 'GameServerTracker Lametric App is OP !',
      }
    }
  })
  getHello(): any {
    return this.appService.getHello();
  }
}
