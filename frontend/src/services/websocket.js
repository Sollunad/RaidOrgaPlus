const WebSocketClient = require('websocket').w3cwebsocket;
const config = require('./config.json');
const _cookies = require('./util/cookies');

export default class WSClient {
    constructor(termin) {
        const environment = process.env.NODE_ENV;
        let url = config[environment];
        url = url.replace(/http/, 'ws');
        const session = _cookies.default.getCookie('session');
        const urlWithQuery = `${url}?session=${session}&termin=${termin}`;
        this.client = new WebSocketClient(urlWithQuery, 'echo-protocol');
        this.output = null;
        const that = this;
        this.client.onmessage = function(message) {
            that.output = message.data;
        };
    }

    sendMessage(message) {
        if (this.client && this.client.readyState === 1) {
            this.client.send(message);
        }
    }

    sendRefresh() {
        this.sendMessage('Refresh');
    }

    close() {
        this.client.close();
    }
}