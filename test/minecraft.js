const mc = require("minecraft-server-ping");

mc.ping("164.132.206.97")
.then(data => {
    console.log(`${data.players.online} / ${data.players.max}`);
})
.catch(err => {
    console.log("FUCK");
    console.log(err);
})