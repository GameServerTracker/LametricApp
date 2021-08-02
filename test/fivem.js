const fiveM = require('fivem');

const srv = new fiveM.Server('ip');

srv.getPlayers()
    .then(data => {
        const p = data;
        srv.getMaxPlayers()
            .then(data => {
                console.log(`${p} / ${data}`);
            })
            .catch(err => { console.error(err); })
    })
    .catch(err => { console.error(err); })