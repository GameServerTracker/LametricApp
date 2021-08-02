const ssq = require('ssq');

ssq.set_timeout(5000);
// Default port for Source server : 27015
ssq.info('ip', 27015, function (err, data) {
  if (err) {
    console.error(err)
    console.log(`OFFLINE`);
    return
  }
  if (data) {
    console.log(data);
    console.log(`${data.numplayers} / ${data.maxplayers}`);
  } else
    return console.log(`OFFLINE`);
});

