import { ApiProperty } from "@nestjs/swagger";

export default class GoalData {
    constructor(current: number, start: number, end: number, unit: string, duration: number, progress: number, direction: string) {
         this.current = current;
         this.start = start;
         this.end = end;
         this.unit = unit;
    }

    @ApiProperty({
        description: "Current value",
        example: 100
    })
    current: number;

    @ApiProperty({
        description: "Start value",
        example: 0
    })
    start: number;

    @ApiProperty({
        description: "End value",
        example: 100
    })
    end: number;

    @ApiProperty({
        description: "Unit",
        example: "players"
    })
    unit: string;
}