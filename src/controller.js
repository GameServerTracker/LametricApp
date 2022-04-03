const config = require('../config.json');
const server = require('./serverStatus');

const typeTab = ["Minecraft", "Source", "FiveM"];
const dataFormat = {
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
};

exports.checkServer = (req, res) => {
    let data = dataFormat;
    let params = req.query;

    if (!params.hasOwnProperty("name") || !params.hasOwnProperty("type") || !params.hasOwnProperty("address"))
        return res.status(400).json({ msg: "Missing parameters" });
    if (params.name !== '')
        data.frames[0].text = params.name;
    if (params.type == '' || !typeTab.includes(params.type))
        return res.status(200).json(data);
    if (params.address == '')
        return res.status(200).json(data);

    if (params.type === "Minecraft") {
        data.frames[0].icon = config.icon.minecraft;
        data.frames[1].icon = config.icon.minecraft;
        server.minecraft(params.address)
            .then(result => {
                data.frames[1].text = result;
                res.status(200).json(data);
            })
            .catch(err => {
                console.error(`Error Minecraft: ${err}`);
                data.frames[1].text = "OFFLINE";
                res.status(200).json(data);
            });
    } else if (params.type === "Source") {
        data.frames[0].icon = config.icon.source;
        data.frames[1].icon = config.icon.source;
        server.source(params.address)
            .then(result => {
                data.frames[1].text = result;
                res.status(200).json(data);
            })
            .catch(err => {
                console.error(`Error Source: ${err}`);
                data.frames[1].text = "OFFLINE";
                res.status(200).json(data);
            });
    } else if (params.type === "FiveM") {
        data.frames[0].icon = config.icon.fivem;
        data.frames[1].icon = config.icon.fivem;
        server.five(params.address)
            .then(result => {
                data.frames[1].text = result;
                res.status(200).json(data);
            })
            .catch(err => {
                console.error(`Error FiveM: ${err}`);
                data.frames[1].text = "OFFLINE";
                res.status(200).json(data);
            });
    } else {
        data.frames[1].text = "OFFLINE";
        res.status(200).json(data);
    }
    console.log(data);
}