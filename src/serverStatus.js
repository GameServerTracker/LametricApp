const mc = require("minecraft-server-ping");
const ssq = require('ssq');
const fiveM = require('fivem');

exports.minecraft = (address) => {
    const ipTab = address.split(':');
    let port = 25565;

    return new Promise((resolve, reject) => {
        if (ipTab[1] != undefined)
            port = ipTab[1];
        if (port < 0 || port > 65536)
            reject("Bad port : port should be > 0 and < 65536.");
        mc.ping(ipTab[0], port)
            .then(data => {
                console.log("GO");
                console.log(data);
                resolve(`${data.players.online} / ${data.players.max}`);
            })
            .catch(err => {
                console.error("Hé bah non")
                reject(err);
            })
    })
}

exports.source = (address) => {
    let port = 27015;
}

exports.five = (address) => {

}