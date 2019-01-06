let express = require('express');
let cors = require('cors');
let app = express();

const raids = require('./raids/raids');
const termin = require('./termin/termin');
const login = require('./user/login');
const register = require('./user/register');
const session = require('./user/session');
const user = require('./user/user');
const api = require('./user/apikey');
const encounter = require('./encounter/encounter');
const progress = require('./encounter/progress');
const feedback = require('./feedback/feedback');
const aufstellung = require('./aufstellung/aufstellung');
const classes = require('./class/class');
const element = require('./aufstellung/element');

const fs = require('fs');
const http = require('http');
const https = require('https');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    //credentials : true
};

app.use(cors(corsOptions));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use('/icons', express.static('icons'));

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

app.get('/raids/players', async function (req, res) {
    const raid_id = req.query.raid;
    if (raid_id) {
        res.send(await raids.listPlayers(raid_id));
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

app.get('/termin/isArchived', async function (req, res) {
    const termin_id = req.query.termin;
    if (termin_id) {
        res.send(await termin.isArchived(termin_id));
    } else {
        res.send([]);
    }
});

app.post('/termin/neu', async function(req, res) {
    const raid = req.body.raid;
    const date = req.body.date;
    const time = req.body.time;
    if (raid && date && time) {
        res.send(await termin.newTermin(raid, date, time));
    } else {
        res.send([]);
    }
});

app.post('/termin/archive', async function(req, res) {
    const termin_id = req.body.termin;
    if (termin_id) {
        res.send(await termin.archive(termin_id));
    } else {
        res.send([]);
    }
});

app.post('/termin/anmelden', async function(req, res) {
    const spieler = req.body.spieler;
    const termin_id = req.body.termin;
    const type = req.body.type;
    if (spieler && termin_id && (type || type === 0)) {
        res.send(await termin.anmelden(spieler, termin_id, type));
    } else {
        res.send([]);
    }
});

app.post('/termin/addBoss', async function(req, res) {
    const termin_id = req.body.termin;
    const boss = req.body.boss;
    if (termin_id && boss) {
        termin.addBoss(termin_id, boss).then(async () => {
            res.send(await aufstellung.getForTermin(termin_id));
        })
    } else {
        res.send([]);
    }
});

app.post('/termin/addWing', async function(req, res) {
    const termin_id = req.body.termin;
    const wing = req.body.wing;
    if (termin_id && wing) {
        termin.addWing(termin_id, wing).then(async () => {
            res.send(await aufstellung.getForTermin(termin_id));
        })
    } else {
        res.send([]);
    }
});

app.get('/termin/anmeldung', async function(req, res) {
    const spieler = req.query.spieler;
    const termin_id = req.query.termin;
    if (spieler && termin_id) {
        res.send(await termin.getAnmeldung(spieler, termin_id));
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
    const aufstellung = req.query.aufstellung;
    const wing = req.query.wing;
    if (aufstellung) {
        res.send(await encounter.getForAufstellung(aufstellung));
    } else if (wing) {
        res.send(await encounter.listForWing(wing));
    } else {
        res.send(await encounter.list());
    }
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
        res.send(await api.setApi(user_id, apiKey));
    } else {
        res.send(false);
    }
});

app.get('/api', async function(req, res) {
    const user_id = req.query.user;
    if (user_id) {
        res.send(await api.hasApi(user_id));
    } else {
        res.send(false);
    }
});

app.post('/feedback', async function(req, res) {
    const text = req.body.text;
    const user = req.body.accname;
    if (text) {
        feedback.new(text, user);
    }
    res.send([]);
});

app.post('/changeName', async function(req, res) {
    const name = req.body.name;
    const user_id = req.body.userId;
    if (name && user_id) {
        user.changeName(user_id, name);
    }
    res.send([]);
});

app.get('/aufstellungen', async function(req, res) {
   const termin_id = req.query.termin;
   if (termin_id) {
       res.send(await aufstellung.getForTermin(termin_id));
   } else {
       res.send([]);
   }
});

app.get('/aufstellungen/success', async function(req, res) {
    const aufstellung_id = req.query.aufstellung;
    if (aufstellung_id) {
        res.send(await aufstellung.getSuccess(aufstellung_id));
    } else {
        res.send([]);
    }
});

app.post('/aufstellungen/success', async function(req, res) {
    const aufstellung_id = req.body.aufstellung;
    const success = req.body.success;
    if (aufstellung_id && success) {
        res.send(await aufstellung.setSuccess(aufstellung_id, success));
    } else {
        res.send([]);
    }
});

app.post('/aufstellungen/delete', async function(req, res) {
    const aufstellung_id = req.body.aufstellung;
    const termin_id = req.body.termin;
    if (aufstellung_id && termin_id) {
        aufstellung.delete(aufstellung_id).then(async () => {
            res.send(await aufstellung.getForTermin(termin_id));
        })
    } else {
        res.send([]);
    }
});

app.get('/class', async function(req, res) {
    const base = req.query.base;
    if (base) {
        res.send(await classes.getForBase(base));
    } else {
        res.send([]);
    }
});

app.get('/element', async function(req, res) {
    const aufstellung = req.query.aufstellung;
    if (aufstellung) {
        res.send(await element.getAll(aufstellung));
    } else {
        res.send([]);
    }
});

app.post('/element/set', async function(req, res) {
    const aufstellung = req.body.aufstellung;
    const position = req.body.position;
    const type = req.body.type;
    const value = req.body.value;
    if (aufstellung && position && type && value) {
        if (type === "class") {
            element.setClass(aufstellung, position, value).then(async () => {
                res.send(await element.getAll(aufstellung));
            });
        } else if (type === "role") {
            element.setRole(aufstellung, position, value).then(async () => {
                res.send(await element.getAll(aufstellung));
            });
        } else if (type === "name") {
            element.setName(aufstellung, position, value).then(async () => {
                res.send(await element.getAll(aufstellung));
            });
        } else {
            res.send([]);
        }

    } else {
        res.send([]);
    }
});

try {
    // Certificate
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/sv.sollunad.de/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/sv.sollunad.de/cert.pem', 'utf8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/sv.sollunad.de/chain.pem', 'utf8');

    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };

    https.createServer(credentials, app).listen(3000, function () {
        console.log('Server über HTTPS gestartet auf Port 3000!');
    });
} catch(e) {
    console.log('Server konnte über HTTPS nicht gestartet werden');
    http.createServer(app).listen(3001, function () {
        console.log('Server über HTTP gestartet auf Port 3001!');
    });
}

