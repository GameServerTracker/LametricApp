import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ServerType } from "src/config/enum";

export default class ServerCheckedDto {
    @ApiProperty({
        description: "Name of game server",
        example: "Hypixel"
    })
    @IsNotEmpty() @IsString()
    name: string;

    @ApiProperty({
        description: "Type of game server",
        example: ServerType.Minecraft,
        enum: [ServerType.Minecraft, ServerType.Source, ServerType.FiveM],
    })
    @IsNotEmpty() @IsString()
    type: string;

    @ApiProperty({
        description: "Server's address",
        example: "mc.hypixel.net",
    })
    @IsNotEmpty() @IsString()
    address: string;
}