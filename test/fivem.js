const fiveM = require('fivem');

const srv = new fiveM.Server('185.157.247.67:30120');

srv.getPlayers()
.then(data => {
    const p = data;
    srv.getMaxPlayers()
    .then(data => {
        console.log(`${p} / ${data}`);
    })
    .catch(err => {
        console.error("SALE CON !");
        console.error(err);
    })
})
.catch(err => {
    console.log("FUK");
    console.error(err);
})