import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ServerTypeParams } from "src/config/enum";

export default class ServerCheckedDto {
    @ApiProperty({
        description: "Name of game server",
        example: "Hypixel"
    })
    @IsNotEmpty() @IsString()
    name: string;

    @ApiProperty({
        description: "Type of game server",
        example: ServerTypeParams.Minecraft,
        enum: [ServerTypeParams.Minecraft, ServerTypeParams.MinecraftBedrock, ServerTypeParams.Source, ServerTypeParams.FiveM, ServerTypeParams.FiveMByCfxCode],
    })
    @IsNotEmpty() @IsString() @IsEnum(ServerTypeParams)
    type: ServerTypeParams;

    @ApiProperty({
        description: "Server's address",
        example: "mc.hypixel.net",
    })
    @IsNotEmpty() @IsString()
    address: string;

    @ApiProperty({
        description: "Enable sparkline",
        enum: ["true", "false"],
    })
    @IsOptional() @IsString()
    sparkline: string = "false";
}