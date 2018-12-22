let express = require('express');
let cors = require('cors');
let app = express();

const raids = require('./raids/raids.js');
const termin = require('./termin/termin.js');
const login = require('./user/login.js');
const register = require('./user/register.js');
const session = require('./user/session.js');
const user = require('./user/user.js');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    //credentials : true
}

app.use(cors(corsOptions));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/raids', async function (req, res) {
    const user_id = req.query.user;
    const raid_id = req.query.raid;
    if (user_id) {
        res.send(await raids.listForPlayer(user_id));
    } else if (raid_id) {
        res.send(await raids.get(raid_id));
    } else {
        res.send([]);
    }
});

app.get('/termin', async function (req, res) {
    const raid_id = req.query.raid;
    const archive = req.query.archive;
    if (raid_id) {
        if (archive && archive === "1") {
            res.send(await termin.listArchived(raid_id));
        } else {
            res.send(await termin.listActive(raid_id));
        }
    } else {
        res.send([]);
    }
});

app.get('/user', async function (req, res) {
    const user_id = req.query.id;
    if (user_id) {
        const resp = await user.get(user_id);
        console.log(resp);
        res.send(resp);
    } else {
        res.send([]);
    }
});

app.get('/session', async function (req, res) {
    const uuid = req.query.uuid;
    if (session) {
        res.send(await session.getUser(uuid));
    } else {
        res.send([]);
    }
});

app.post('/register', function(req, res) {
    const accName = req.body.accName;
    const pwd = req.body.pwd;
    const name = req.body.name;
    if (accName && pwd && name) {
        register.register(accName, pwd, name);
        res.send('Success!');
    }
});

app.post('/login', async function(req, res) {
    const accName = req.body.accName;
    const pwd = req.body.pwd;
    if (accName && pwd) {
        res.send(await login.login(accName, pwd));
    } else {
        res.send([]);
    }
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});