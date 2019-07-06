const express = require('express');
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload');
const logger = require('simple-node-logger').createSimpleLogger('backend.log');

const fs = require('fs');
const http = require('http');
const https = require('https');

const auth = require('./authentication/auth').auth;

let endpoints = [];

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    //credentials : true
};

app.use(cors(corsOptions));
app.use(express.json());       // to support JSON-encoded bodies
app.use('/icons', express.static('icons'));
app.use('/reports', express.static('reports/parsed'));
app.use(fileUpload());

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
    const method = endpoint.method;
    const fullPath = `/${path}${endpoint.path}`;
    if (!endpoints[method]) endpoints[method] = [];
    logger.debug(`Register ${method} @ ${fullPath}`);
    endpoints[method][fullPath] = endpoint;
}

app.route('*').all(async function(req, res) {
    res.send(await requestHandler(req));
});

async function requestHandler(request) {
    const method = request.method.toLowerCase();
    const endpoint = endpoints[method][request._parsedUrl.pathname];
    if (!endpoint) return [];

    let uuid, authentication;
    if (method === 'get') uuid = request.query.auth;
    else uuid = request.body.auth;
    if (uuid) authentication = await auth(uuid);

    const authNeeded = endpoint.authed;

    if (authentication) {
        logRequest(method, request._parsedUrl.pathname, authentication.user);
        return await endpoint.function(request, authentication);
    }
    else {
        logRequest(method, request._parsedUrl.pathname);
        if (!authNeeded) {
            return await endpoint.function(request);
        }
        logger.warn('Missing Authentication!');
        return [];
    }
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

    const env = process.argv[2];
    if (env === 'http') {
        serveHTTP();
    } else {
        serveHTTPS(credentials);
    }
} catch(e) {
    logger.warn('Server konnte über HTTPS nicht gestartet werden');
    serveHTTP();
}

function serveHTTPS(credentials) {
    https.createServer(credentials, app).listen(8080, function () {
        logger.info('Server über HTTPS gestartet auf Port 8080!');
    });
}

function serveHTTP() {
    http.createServer(app).listen(8081, function () {
        logger.info('Server über HTTP gestartet auf Port 8081!');
    });
}

function logRequest(method, endpoint, user) {
    if (user) {
        logger.info(method, ' @ ', endpoint, ' by ', user);
    } else {
        logger.info(method, ' @ ', endpoint);
    }
}
