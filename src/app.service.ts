import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return { message: 'GameServerTracker 3.0 is OK !' };
  }
}
