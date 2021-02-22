// const WebSocketClient = require('websocket').w3cwebsocket;
import { w3cwebsocket as WebSocketClient } from 'websocket';
import config from './config.json';
import _cookies from './util/cookies';

export default class WSClient {
	private client: WebSocketClient;
	private output: string | Buffer | ArrayBuffer | null;

    constructor(termin: string) {
        const environment = process.env.NODE_ENV as "development" | "production";
        let url = config[environment];
        url = url.replace(/http/, 'ws');
        const session = _cookies.getCookie('session');
        const urlWithQuery = `${url}?session=${session}&termin=${termin}`;
        this.client = new WebSocketClient(urlWithQuery, 'echo-protocol');
        this.output = null;
        const that = this;
        this.client.onmessage = function(message) {
            that.output = message.data;
        };
    }

    sendMessage(message: any) {
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