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
            .then(data => { resolve(`${data.players.online} / ${data.players.max}`); })
            .catch(err => { reject(err); })
    })
}

exports.source = (address) => {
    const ipTab = address.split(':');
    let port = 27015;

    return new Promise((resolve, reject) => {
        if (ipTab[1] != undefined)
            port = ipTab[1];
        if (port < 0 || port > 65536)
            reject("Bad port : port should be > 0 and < 65536.");
        ssq.info(ipTab[0], port, function (err, data) {
            if (err)
                reject(err);
            if (data)
                resolve(`${data.numplayers} / ${data.maxplayers}`);
            else
                return console.log(`OFFLINE`);
        });
    })
}

exports.five = (address) => {

    const ipTab = address.split(':');

    return new Promise((resolve, reject) => {
        if (ipTab[1] != undefined)
            if (ipTab[1] < 0 || ipTab[1] > 65536)
                reject("Bad port : port should be > 0 and < 65536.");

        const srv = new fiveM.Server('185.157.247.67:30120');
        srv.getPlayers()
            .then(data => {
                const p = data;
                srv.getMaxPlayers()
                    .then(data => { resolve(`${p} / ${data}`); })
                    .catch(err => { reject(err); })
            })
            .catch(err => { reject(err); })
    })
}