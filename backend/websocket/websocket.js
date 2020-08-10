const WebSocketServer = require('websocket').server;
const _role = require('../authentication/role');
const _auth = require('../authentication/auth');
const uuid = require('uuid');

exports.start = start;

let connections = [];

function start(server) {
    const wsServer = new WebSocketServer({
        httpServer: server,
        autoAcceptConnections: false
    });

    wsServer.on('request', async function(request) {
        if (!originIsAllowed(request.origin)) {
            request.reject();
        } else {
            const connection = request.accept('echo-protocol', request.origin);
            const query = request.resourceURL.query;

            if (query.session && query.termin) {
                const agent = request.httpRequest.headers['user-agent'];
                const authentication = await _auth.auth(query.session, agent);
                const role = await _role.forTermin(authentication, query.termin);

                if (role != null) {
                    connection.session = query.session;
                    connection.termin = query.termin;
                    connection.uuid = uuid.v4();
                    connections.push(connection);

                    connection.on('message', function(message) {
                        if (message.type === 'utf8') {
                            sendMessageToAllInTermin(connection, message.utf8Data);
                        }
                    });

                    connection.on('close', function(reasonCode, description) {
                        connections = connections.filter(c => c.uuid !== connection.uuid);
                    });
                }
            }
        }
    });
}

function sendMessageToAll(message) {
    connections.forEach((connection) => {
        connection.sendUTF(message);
    })
}

function sendMessageToAllInTermin(sender, message) {
    connections.forEach((connection) => {
        if (connection.uuid !== sender.uuid && connection.termin === sender.termin) {
            connection.sendUTF(message);
        }
    })
}

function originIsAllowed(origin) {
    return true;
}