const config = require('../config.json');
const server = require('./serverStatus');

const typeTab = ["Minecraft", "Source", "FiveM"];

exports.checkServer = (req, res) => {
    let data = {
        "frames": [
            {
                "text": "Server",
                "icon": config.icon.unknown
            },
            {
                "text": "OFFLINE",
                "icon": config.icon.unknown
            }
        ]
    }

    if (!req.query.hasOwnProperty("name") ||
        !req.query.hasOwnProperty("type") ||
        !req.query.hasOwnProperty("address"))
        return res.status(400).json({ msg: "Missing parameters" });
    if (req.query["name"] !== '')
        data.frames[0].text = req.query["name"];
    if (req.query["type"] == '' ||
        !typeTab.includes(req.query["type"]))
        return res.status(200).json(data);
    if (req.query["address"] == '')
        return res.status(200).json(data);

    if (req.query["type"] === "Minecraft") {
        server.minecraft(req.query["address"])
            .then(result => {
                data.frames[1].text = result;
                return res.status(200).json(data);
            })
            .catch(err => {
                console.error(err);
                return res.status(200).json(data);
            });
    }
}