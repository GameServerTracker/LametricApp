import { IconServer, ServerType } from "./enum";

const serverIconDict: { [serverType in ServerType]: IconServer} = {
    Minecraft: IconServer.Minecraft,
    Source: IconServer.Source,
    FiveM: IconServer.FiveM,
    FiveMCfxCode: IconServer.FiveM,
};

export {
    serverIconDict
};