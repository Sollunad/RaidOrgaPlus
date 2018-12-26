let express = require('express');
let cors = require('cors');
let app = express();

const raids = require('./raids/raids');
const termin = require('./termin/termin');
const login = require('./user/login');
const register = require('./user/register');
const session = require('./user/session');
const user = require('./user/user');
const encounter = require('./encounter/encounter');
const progress = require('./encounter/progress');
const feedback = require('./feedback/feedback');

const fs = require('fs');
const https = require('https');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    //credentials : true
};

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/sv.sollunad.de/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/sv.sollunad.de/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/sv.sollunad.de/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

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

app.get('/role', async function (req, res) {
    const user_id = req.query.user;
    const raid_id = req.query.raid;
    if (user_id && raid_id) {
        res.send(await raids.role(raid_id, user_id));
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
        res.send(await user.get(user_id));
    } else {
        res.send([]);
    }
});

app.get('/session', async function (req, res) {
    const uuid = req.query.uuid;
    const invalidate = req.query.invalidate;
    if (uuid) {
        if (invalidate && invalidate === "1") {
            res.send(await session.invalidate(uuid));
        } else {
            res.send(await session.getUser(uuid));
        }
    } else {
        res.send([]);
    }
});

app.post('/register', async function(req, res) {
    const accName = req.body.accName;
    const pwd = req.body.pwd;
    const name = req.body.name;
    if (accName && pwd && name) {
        res.send(await register.register(accName, pwd, name));
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

app.get('/encounter', async function(req, res) {
    res.send(await encounter.list());
});

app.get('/progress', async function(req, res) {
    const user_id = req.query.user;
    if (user_id) {
        res.send(await progress.progress(user_id));
    } else {
        res.send([]);
    }
});

app.post('/setapi', async function(req, res) {
    const user_id = req.body.userId;
    const apiKey = req.body.apiKey;
    if (user_id && apiKey) {
        res.send(await user.setApi(user_id, apiKey));
    } else {
        res.send(false);
    }
});

app.get('/api', async function(req, res) {
    const user_id = req.query.user;
    if (user_id) {
        res.send(await user.hasApi(user_id));
    } else {
        res.send(false);
    }
});

app.post('/feedback', async function(req, res) {
    const text = req.body.text;
    const user = req.body.accname;
    console.log('Hi!');
    if (text) {
        feedback.new(text, user);
    }
    res.send([]);
});

https.createServer(credentials, app).listen(3000, function () {
    console.log('Example app listening on port 3000!');
});