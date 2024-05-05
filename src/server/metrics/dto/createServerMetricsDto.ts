import { EServerType } from "src/server/enums/serverType.enum";

export class CreateServerMetricsDto {
    public address: string;
    public type: EServerType;
    public playersOnline: number;
    public playersMax: number;
    public agent?: string = null;
    public playerList?: string = null;
    public isOnline?: boolean = false;
    public errorMessage?: string = null;
}