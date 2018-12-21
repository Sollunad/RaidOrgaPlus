let express = require('express');
let cors = require('cors');
let app = express();

const raids = require('./raids/raids.js');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    //credentials : true
}

app.use(cors(corsOptions));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/raids', async function (req, res) {
    const user_id = req.query.user;
    res.send(await raids.listForPlayer(user_id));
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});