import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return { message: 'GameServerTracker Lametric App is OP !' };
  }
}
