import { IsNotEmpty, IsString } from "class-validator";

export default class ServerCheckedDto {
    @IsNotEmpty() @IsString()
    name: string;

    @IsNotEmpty() @IsString()
    type: string;

    @IsNotEmpty() @IsString()
    address: string;
}