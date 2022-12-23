import { IconServer, ServerType } from "./enum";

const serverTypeDict: { [serverType: string]: ServerType} = {
    "Minecraft": ServerType.Minecraft,
    "Source": ServerType.Source,
    "FiveM": ServerType.FiveM
};

const serverIconDict: { [serverType in ServerType]: IconServer} = {
    Minecraft: IconServer.Minecraft,
    Source: IconServer.Source,
    FiveM: IconServer.FiveM
};

export {
    serverTypeDict,
    serverIconDict
};