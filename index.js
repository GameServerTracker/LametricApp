const express = require('express');
const app = express();
const port = process.env.PORT || 3042;
const controller = require('./src/controller');

app.get('/server', controller.checkServer);
app.use(function(req, res) {
    res.status(404).json({msg: "Route not found !"});
});

console.log(`GameServerTracker - Lametric App server started on: ${port}`);
app.listen(port);