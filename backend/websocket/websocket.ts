import { connection, server as WebSocketServer} from "websocket";
import * as _role from '../authentication/role';
import * as _auth from '../authentication/auth';
import uuid from 'uuid';
import { ParsedUrlQuery } from "querystring";
import { Server as httpServer } from "http";
import { Server as httpsServer } from "https";

interface websocketConnection extends connection {
	session: string;
	termin: string;
	uuid: string;
}

let connections: websocketConnection[] = [];

export function start(server: httpServer | httpsServer): void {
    const wsServer = new WebSocketServer({
        httpServer: server,
        autoAcceptConnections: false
    });

    wsServer.on('request', async function(request) {
        if (!originIsAllowed(request.origin)) {
            request.reject();
        } else {
            const connection: websocketConnection = request.accept('echo-protocol', request.origin) as websocketConnection;
            const query = request.resourceURL.query as ParsedUrlQuery;

            if (query.session && query.termin) {
                const agent = request.httpRequest.headers['user-agent'];
                const authentication = await _auth.auth(query.session as string, agent);
                const role = await _role.forTermin(authentication, Number(query.termin as string));

                if (role != null) {
                    connection.session = query.session as string;
                    connection.termin = query.termin as string;
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

function sendMessageToAll(message): void {
    connections.forEach((connection) => {
        connection.sendUTF(message);
    })
}

function sendMessageToAllInTermin(sender, message): void {
    connections.forEach((connection) => {
        if (connection.uuid !== sender.uuid && connection.termin === sender.termin) {
            connection.sendUTF(message);
        }
    })
}

function originIsAllowed(origin): boolean {
    return true;
}