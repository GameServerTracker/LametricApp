import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumberString, IsString } from "class-validator";
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
        enum: [ServerType.Minecraft, ServerType.MinecraftBedrock, ServerType.Source, ServerType.FiveM, ServerType.FiveMByCfxCode],
    })
    @IsNotEmpty() @IsString() @IsEnum(ServerType)
    type: ServerType;

    @ApiProperty({
        description: "Server's address",
        example: "mc.hypixel.net",
    })
    @IsNotEmpty() @IsString()
    address: string;

    @ApiProperty({
        description: "Enable sparkline",
        enum: [1, 0]
    })
    @IsNotEmpty() @IsNumberString()
    sparkline: number;
}