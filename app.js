'use strict';
const express = require("express")
const app = express()
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(express.json());
app.use(express.static('public'));
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})
app.get("/json", async (req, res) => {
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    const results = Object.create(null);
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }
    res.json({
        result: 'ok',
        body: results,
    });
})
const PORT = process.env.PORT || 3000
app.listen(PORT, (err) => {
    if (err) {
        console.error("我去，出错啦！",)
    }
    console.log("正常服务中...", "http://127.0.0.1:" + PORT)
})
