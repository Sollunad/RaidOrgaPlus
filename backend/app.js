let express = require('express');
let cors = require('cors');
let app = express();

const encounter = require('./endpoints/encounter/encounter');
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

app.get('/encounter', async function(req, res) {
    const wing = req.query.wing;
    if (wing) {
        res.send(await encounter.listForWing(wing));
    } else {
        res.send(await encounter.list());
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
