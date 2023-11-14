import { ArgumentsHost, BadRequestException, Catch, Logger } from "@nestjs/common";
import FrameTextDto from "src/lametric/frameTextDto";

@Catch(BadRequestException)
export default class RequestIncompleteFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        Logger.warn("The request is incomplete, default response is sent.", exception.getResponse(), "RequestIncompleteFilter");
        const response = host.switchToHttp().getResponse();
        response.status(200)
            .json({
                "frames": [
                    new FrameTextDto("Please fill all fields in Lametric app.", "555")
                ]
            });
    }
}