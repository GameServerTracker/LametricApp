import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import FrameGoalDto from "./frameGoalDto";
import FrameSparklineDto from "./frameSparklineDto";
import FrameTextDto from "./frameTextDto";

export default class FrameDto {    
    @ApiProperty({
        description: "Frames to display on the LaMetric device",
        type: 'array',
        items: { oneOf: [
            { $ref: getSchemaPath(FrameTextDto) },
            { $ref: getSchemaPath(FrameGoalDto) },
            { $ref: getSchemaPath(FrameSparklineDto) }
        ]}
    })
    frames: (FrameTextDto | FrameGoalDto | FrameSparklineDto)[];
}