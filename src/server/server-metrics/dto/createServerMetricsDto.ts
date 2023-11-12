import { ServerType } from "src/config/enum";

export class CreateServerMetricsDto {
    public address: string;
    public type: ServerType;
    public playersOnline: number;
    public playersMax: number;
}