const ssq = require('ssq');

//Port should be > 0 and < 65536. Received 127015.

ssq.set_timeout(5000);
ssq.info('208.103.169.33', 27015, function(err, data) {
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

