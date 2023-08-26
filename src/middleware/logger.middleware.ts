import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger: Logger = new Logger('HTTP');
    use(req: Request, res: Response, next: NextFunction) {
        res.on("finish", () => {
            if (res.statusCode >= 500)
                this.logger.error(`HTTP request ${req.method} ${req.url} ${res.statusCode} ${res.statusMessage}`);
            else if (res.statusCode >= 400)
                this.logger.warn(`HTTP request ${req.method} ${req.url} ${res.statusCode} ${res.statusMessage}`);
            else
                this.logger.log(`HTTP request ${req.method} ${req.url} ${res.statusCode}`);
        });
        next();
    }
}