import { IconServer, ServerTypeParams } from "./enum";

const serverIconDict: { [serverType in ServerTypeParams]: IconServer} = {
    Minecraft: IconServer.Minecraft,
    MinecraftBedrock: IconServer.Minecraft,
    Source: IconServer.Source,
    FiveM: IconServer.FiveM,
    FiveMCfxCode: IconServer.FiveM,
};

export {
    serverIconDict
};