let express = require('express');
let cors = require('cors');
let app = express();

const fs = require('fs');
const http = require('http');
const https = require('https');

let endpoints = [];
endpoints['get'] = [];
endpoints['post'] = [];
endpoints['put'] = [];
endpoints['delete'] = [];

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
    console.log(`Register ${endpoint.method} @ /${path}${endpoint.path}`);
    endpoints[endpoint.method][`/${path}${endpoint.path}`] = endpoint.function;
}

app.get('*', async function(req, res) {
    res.send(await requestHandler('get', req));
});

app.post('*', async function(req, res) {
    res.send(await requestHandler('post', req));
});

app.put('*', async function(req, res) {
    res.send(await requestHandler('put', req));
});

app.delete('*', async function(req, res) {
    res.send(await requestHandler('delete', req));
});

async function requestHandler(method, request) {
    return await endpoints[method][request._parsedUrl.pathname](request);
}


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
