let express = require('express');
let cors = require('cors');
let app = express();

const login = require('./endpoints/users/login');
const register = require('./endpoints/users/register');
const session = require('./endpoints/users/session');
const user = require('./endpoints/users/user');
const api = require('./endpoints/users/apikey');
const encounter = require('./endpoints/encounter/encounter');
const progress = require('./endpoints/progress/progress');
const feedback = require('./endpoints/feedback/feedback');
const classes = require('./endpoints/class/class');

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

fs.readdir('./endpoints/', (err, folders) => {
    folders.forEach(folder => {
        fs.readdir(`./endpoints/${folder}`, (err, files) => {
            files.forEach(file => {
                if (file === 'controller.js') {
                    const endpoints = require(`./endpoints/${folder}/controller.js`);
                    endpoints.forEach(endpoint => {
                        registerEndpoint(folder, endpoint);
                    })
                }
            });
        });
    });
});

function registerEndpoint(path, endpoint) {
    console.log(endpoint);
    switch (endpoint.method) {
        case 'get': app.get(`/${path}${endpoint.path}`, endpoint.function); break;
        case 'post': app.post(`/${path}${endpoint.path}`, endpoint.function); break;
        case 'put': app.put(`/${path}${endpoint.path}`, endpoint.function); break;
        case 'delete': app.delete(`/${path}${endpoint.path}`, endpoint.function); break;
        default: break;
    }
}

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
    const wing = req.query.wing;
    if (wing) {
        res.send(await encounter.listForWing(wing));
    } else {
        res.send(await encounter.list());
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

app.get('/class', async function(req, res) {
    const base = req.query.base;
    if (base) {
        res.send(await classes.getForBase(base));
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

