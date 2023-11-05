import { ApiProperty } from "@nestjs/swagger";

export default class FrameSparklineDto {
    constructor(index: number, chartData: number[]) {
        this.index = index;
        this.chartData = chartData;
    }

    @ApiProperty({
        description: "Chart index",
        example: 0
    })
    index: number;
    
    @ApiProperty({
        description: "Chart data",
        example: [1, 2, 3, 4, 5]
    })
    chartData: number[];
}