import { ApiProperty } from "@nestjs/swagger";

export default class FrameTextDto {
    constructor(text: string, icon: string) {
        this.text = text;
        this.icon = icon;
    }

    @ApiProperty({
        description: "Text to display",
        example: "Hypixel"
    })
    text: string;

    @ApiProperty({
        description: "Icon to display",
        example: "7285"
    })
    icon: string;
}