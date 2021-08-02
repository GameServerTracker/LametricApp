const mc = require("minecraft-server-ping");

const ip = "ip";
let port = 25565; // Default port for Minecraft server : 25565
const ipTab = ip.split(':');

if (ipTab[1] != undefined)
    port = ipTab[1];

mc.ping(ipTab[0], port)
    .then(data => {
        console.log(`${data.players.online} / ${data.players.max}`);
    })
    .catch(err => {
        console.log(err);
    })